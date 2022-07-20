import { Inject, Injectable, Logger } from '@nestjs/common'
import { IntegrationsService } from '../integrations/integrations.service'
import { OrdersService } from '../orders/orders.service'
import { OrganizationsService } from '../organizations/services/organizations.service'
import { PracticesService } from '../practices/practices.service'
import { ProviderConfigurationsService } from '../providers/services/provider-configurations.service'
import { UsersService } from '../users/users.service'
import * as faker from 'faker'
import { User } from '../users/entity/user.entity'
import { Organization } from '../organizations/entities/organization.entity'
import { Practice } from '../practices/entities/practice.entity'
import { ProviderConfiguration } from '../providers/entities/provider-configuration.entity'
import { Integration } from '../integrations/entities/integration.entity'
import { EventsService } from '../events/events.service'
import { Order } from '../orders/entities/order.entity'
import { Event } from '../events/entities/event.entity'
import { SeedIntegrationsParams } from './typings/seed-integrations-params.interface'
import { IdFirstAndLastName } from './typings/id-first-and-last-name.interface'
import { IdAndName } from './typings/id-and-name.interface'
import { WeightUnits } from '../common/typings/patient-weight.interface'

@Injectable()
export class SeederService {
  private readonly logger = new Logger(SeederService.name)

  constructor (
    @Inject(UsersService) private readonly usersService: UsersService,
    @Inject(OrdersService) private readonly ordersService: OrdersService,
    @Inject(EventsService) private readonly eventsService: EventsService,
    @Inject(PracticesService)
    private readonly practicesService: PracticesService,
    @Inject(IntegrationsService)
    private readonly integrationsService: IntegrationsService,
    @Inject(OrganizationsService)
    private readonly organizationsService: OrganizationsService,
    @Inject(ProviderConfigurationsService)
    private readonly providerConfigurationsService: ProviderConfigurationsService
  ) {}

  async run (): Promise<void> {
    const users = await this.seedUsers()

    const organizations = await this.seedOrganizations(users)

    const practices = await this.seedPractices(organizations)

    const providerConfigurations = await this.seedProviderConfigurations(
      organizations
    )

    const integrations = await this.seedIntegrations({
      organizations,
      practices,
      providerConfigurations
    })

    const orders = await this.seedOrders(integrations)

    await this.seedEvents(orders)
  }

  private async seedUsers (amount = 5): Promise<User[]> {
    const users: User[] = []
    const password = 'qwer1234'

    for (let i = 0; i < amount; i++) {
      const user = await this.usersService.create({
        email: faker.internet.exampleEmail(),
        password
      })

      users.push(user)
    }

    this.logger.debug(
      `Seeded ${users.length} users with password "${password}"...`
    )

    return users
  }

  private async seedOrganizations (users: User[]): Promise<Organization[]> {
    const organizations: Organization[] = []

    for (const user of users) {
      const organization = await this.organizationsService.create(
        { name: faker.company.companyName() },
        user
      )

      organizations.push(organization)
    }

    this.logger.debug(`Seeded ${organizations.length} organizations...`)

    return organizations
  }

  private async seedPractices (
    organizations: Organization[]
  ): Promise<Practice[]> {
    const practices: Practice[] = []

    for (const organization of organizations) {
      const practice = await this.practicesService.create(organization, {
        name: faker.commerce.productName()
      })

      practices.push(practice)
    }

    this.logger.debug(`Seeded ${practices.length} practices...`)

    return practices
  }

  private async seedProviderConfigurations (
    organizations: Organization[]
  ): Promise<ProviderConfiguration[]> {
    const providerConfigurations: ProviderConfiguration[] = []

    for (const organization of organizations) {
      const providerConfiguration = await this.providerConfigurationsService.create(
        organization,
        'zoetis-v1',
        {
          url: 'https://qa.vetscanconnect.zoetis.com',
          partnerId: faker.random.uuid(),
          partnerToken: faker.internet.password()
        }
      )

      providerConfigurations.push(providerConfiguration)
    }

    this.logger.debug(
      `Seeded ${providerConfigurations.length} providerConfigurations...`
    )

    return providerConfigurations
  }

  private async seedIntegrations ({
    organizations,
    practices,
    providerConfigurations
  }: SeedIntegrationsParams): Promise<Integration[]> {
    const integrations: Integration[] = []

    for (let i = 0; i < organizations.length; i++) {
      const organization = organizations[i]
      const practice = practices.find(
        practice => practice.organizationId === organization.id
      )
      const providerConfiguration = providerConfigurations.find(
        providerConfiguration =>
          providerConfiguration.organizationId === organization.id
      )

      if (practice == null || providerConfiguration == null) {
        continue
      }

      const integration = await this.integrationsService.create({
        practiceId: practice.id,
        providerConfigurationId: providerConfiguration.id,
        integrationOptions: {
          clientId: 'f1cc5ab3-c563-47be-86f8-837e14a2228f'
        }
      })

      integrations.push(integration)
    }

    this.logger.debug(`Seeded ${integrations.length} integrations...`)

    return integrations
  }

  private async seedOrders (
    integrations: Integration[],
    ordersPerIntegration = 5
  ): Promise<Order[]> {
    const orders: Order[] = []

    for (const integration of integrations) {
      for (let i = 0; i < ordersPerIntegration; i++) {
        const order = await this.ordersService.createOrder({
          integrationId: integration.id,
          requisitionId: 'some-pims-id',
          patient: {
            ...this.generateIdAndName(),
            species: 'CANINE',
            sex: 'FEMALE_INTACT',
            birthdate: faker.date.past().toISOString(),
            breed: 'BOXER',
            weight: {
              measurement: faker.random.number({ min: 6, max: 120 }),
              units: WeightUnits.KG
            }
          },
          client: this.generateIdAndFirstLastName(),
          notes: faker.random.words(8),
          testCodes: ['HEM'],
          veterinarian: this.generateIdAndFirstLastName(),
          technician: faker.name.findName(),
          editable: false
        })

        orders.push(order)
      }
    }

    this.logger.debug(`Seeded ${orders.length} orders...`)

    return orders
  }

  private async seedEvents (orders: Order[]): Promise<Event[]> {
    const events: Event[] = []

    for (const order of orders) {
      const event = await this.eventsService.addEvent({
        namespace: 'orders',
        type: 'order:status',
        value: {
          orderId: order.id,
          status: 'completed'
        },
        integrationId: order.integrationId
      })

      events.push(event)
    }

    this.logger.debug(`Seeded ${events.length} events...`)

    return events
  }

  private generateIdAndFirstLastName (): IdFirstAndLastName {
    return {
      id: faker.random.uuid(),
      lastName: faker.name.firstName(),
      firstName: faker.name.lastName()
    }
  }

  private generateIdAndName (): IdAndName {
    return {
      id: faker.random.uuid(),
      name: faker.name.firstName(),
    }
  }
}
