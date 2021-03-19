import { Inject, Injectable, Logger } from '@nestjs/common'
import { IntegrationsService } from '../integrations/integrations.service'
import { OrdersService } from '../orders/orders.service'
import { OrganizationsService } from '../organizations/organizations.service'
import { PracticesService } from '../practices/practices.service'
import { ProviderConfigurationsService } from '../providers/services/provider-configurations.service'
import { ProvidersService } from '../providers/services/providers.service'
import { UsersService } from '../users/users.service'
import * as faker from 'faker'
import { User } from '../users/entity/user.entity'
import { Organization } from '../organizations/entities/organization.entity'
import { Practice } from '../practices/entities/practice.entity'
import { ProviderConfiguration } from '../providers/entities/provider-configuration.entity'
import { Integration } from '../integrations/entities/integration.entity'
import { EventsService } from '../events/events.service'
import { Order } from '../orders/entities/order.entity'

@Injectable()
export class SeederService {
  private readonly logger = new Logger(SeederService.name)

  constructor (
    @Inject(UsersService) private usersService: UsersService,
    @Inject(OrdersService) private ordersService: OrdersService,
    @Inject(EventsService) private eventsService: EventsService,
    @Inject(ProvidersService) private providersService: ProvidersService,
    @Inject(PracticesService) private practicesService: PracticesService,
    @Inject(IntegrationsService)
    private integrationsService: IntegrationsService,
    @Inject(OrganizationsService)
    private organizationsService: OrganizationsService,
    @Inject(ProviderConfigurationsService)
    private providerConfigurationsService: ProviderConfigurationsService
  ) {}

  async seed () {
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

    const events = await this.seedEvents(orders)
  }

  private async seedUsers (amount = 5) {
    const users = []
    const password = 'qwer1234'

    for (let i = 0; i < amount; i++) {
      const { user } = await this.usersService.create({
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

  private async seedOrganizations (users: User[]) {
    const organizations = []

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

  private async seedPractices (organizations: Organization[]) {
    const practices = []

    for (const organization of organizations) {
      const practice = await this.practicesService.create(organization, {
        name: faker.commerce.productName()
      })

      practices.push(practice)
    }

    this.logger.debug(`Seeded ${practices.length} practices...`)

    return practices
  }

  private async seedProviderConfigurations (organizations: Organization[]) {
    const providerConfigurations = []

    const providers = await this.providersService.findAll()

    for (const organization of organizations) {
      const providerConfiguration = await this.providerConfigurationsService.create(
        organization,
        providers[0].id,
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
  }: {
    organizations: Organization[]
    practices: Practice[]
    providerConfigurations: ProviderConfiguration[]
  }) {
    const integrations = []

    for (let i = 0; i < organizations.length; i++) {
      const organization = organizations[i]
      const practice = practices.find(
        practice => practice.organizationId === organization.id
      )
      const providerConfiguration = providerConfigurations.find(
        providerConfiguration =>
          providerConfiguration.organizationId === organization.id
      )

      const integration = await this.integrationsService.create({
        practiceId: practice.id,
        providerConfigurationId: providerConfiguration.id,
        integrationOptions: { clientId: 'f1cc5ab3-c563-47be-86f8-837e14a2228f' }
      })

      integrations.push(integration)
    }

    this.logger.debug(`Seeded ${integrations.length} integrations...`)

    return integrations
  }

  private async seedOrders (
    integrations: Integration[],
    ordersPerIntegration = 5
  ) {
    const orders = []

    for (const integration of integrations) {
      for (let i = 0; i < ordersPerIntegration; i++) {
        const order = await this.ordersService.createOrder({
          integrationId: integration.id,
          patient: {
            ...this.generateIdAndFirstLastName(),
            species: 'CANINE',
            gender: 'FEMALE_INTACT',
            birthdate: faker.date.past().toISOString(),
            breed: 'BOXER',
            weight: faker.random.number({ min: 6, max: 120 }),
            weightUnits: 'KG'
          },
          client: this.generateIdAndFirstLastName(),
          notes: faker.random.words(8),
          tests: [
            {
              code: 'HEM'
            }
          ],
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

  private async seedEvents (orders: Order[]) {
    const events = []

    for (const order of orders) {
      const event = await this.eventsService.addEvent({
        namespace: 'orders',
        type: 'order:status',
        value: {
          orderId: order.id,
          status: 'completed'
        }
      })

      events.push(event)
    }

    this.logger.debug(`Seeded ${events.length} events...`)

    return events
  }

  private generateIdAndFirstLastName () {
    return {
      id: faker.random.uuid(),
      lastName: faker.name.firstName(),
      firstName: faker.name.lastName()
    }
  }
}
