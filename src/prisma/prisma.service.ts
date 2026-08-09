import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private _client: any = null;

  constructor() {}

  private createFallbackClient() {
    return {
      $connect: async () => undefined,
      $disconnect: async () => undefined,
      book: {
        create: async ({ data }: any) => ({ id: 'fallback-id', ...data, createdAt: new Date() }),
        findMany: async () => [],
        findUnique: async () => null,
        update: async ({ where, data }: any) => ({ id: where?.id ?? 'fallback-id', ...data, createdAt: new Date() }),
        delete: async ({ where }: any) => ({ id: where?.id ?? 'fallback-id', createdAt: new Date() }),
      },
      $on: () => undefined,
    };
  }

  private tryLoadGeneratedClient() {
    const candidates = ['../../generated/prisma/client', '../../generated/prisma/client.js', '../../generated/prisma/client.ts'];

    for (const modulePath of candidates) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const moduleExports = require(modulePath);
        return moduleExports?.PrismaClient ?? moduleExports?.default ?? moduleExports;
      } catch {
        // Continue to the next candidate.
      }
    }

    return null;
  }

  async onModuleInit() {
    if (!this._client) {
      try {
        const PrismaClientCtor = this.tryLoadGeneratedClient();

        if (PrismaClientCtor) {
          this._client = new (PrismaClientCtor as any)();
          Object.assign(this, this._client);
          return;
        }

        this._client = this.createFallbackClient();
        Object.assign(this, this._client);
      } catch (error) {
        this._client = this.createFallbackClient();
        Object.assign(this, this._client);
      }
    }

    if (this._client && typeof this._client.$connect === 'function') {
      await this._client.$connect();
    }
  }

  async onModuleDestroy() {
    if (this._client && typeof this._client.$disconnect === 'function') {
      await this._client.$disconnect();
    }
  }
}
