import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { readFileSync } from 'fs';
import { join } from 'path';
import { DocsConfig } from '../../config/config.interface'

export async function registerSwagger(app: INestApplication): Promise<void> {
  const configService = app.get<ConfigService>(ConfigService);
  const docsConfig = configService.get<DocsConfig>('docs');

  if (!docsConfig) {
    return;
  }

  const version = JSON.parse(
    readFileSync(join(__dirname, '..', '..', '..', 'package.json'), 'utf-8')
  ).version;

  const config = new DocumentBuilder()
    .setTitle(docsConfig.title)
    .setDescription(docsConfig.description)
    .setVersion(version)
    .build();

  const document = SwaggerModule.createDocument(app, config);

  app.getHttpAdapter().get(docsConfig.openApiSpecUrl, (req, res) => {
    res.send(document);
  });

  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      url: docsConfig.openApiSpecUrl,
    },
  });
}
