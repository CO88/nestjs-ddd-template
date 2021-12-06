import { EntityManager, getConnection, QueryRunner } from 'typeorm';
import { Logger } from '../domain/ports/logger.port';

export class TypeOrmUnitOfWork {
  private queryRunners: Map<string, QueryRunner> = new Map();

  constructor(private readonly logger: Logger) {}

  private async start(transanctionUuid: string): Promise<void> {
    const queryRunner = getConnection().createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    this.queryRunners.set(transanctionUuid, queryRunner);
    this.logger.debug('[Start Transaction]', transanctionUuid);
  }

  getEntityManager(transanctionUuid: string): EntityManager {
    this.logger.debug('[Get entity manager]', transanctionUuid);
    return this.queryRunners.get(transanctionUuid).manager;
  }

  private getQueryRunner(transactionUuid: string): QueryRunner {
    return this.queryRunners.get(transactionUuid);
  }

  async excute(transactionUuid: string, work: () => Promise<void>): Promise<void> {
    await this.start(transactionUuid);
    const queryRunner = this.getQueryRunner(transactionUuid);
    try {
      await work();
      await queryRunner.commitTransaction();
      this.logger.debug('[Transaction committed]', transactionUuid);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.logger.debug('[Transaction Rollback]', transactionUuid);
      throw error;
    } finally {
      await queryRunner.release();
      this.queryRunners.delete(transactionUuid);
      this.logger.debug('[Remove Transaction UUID]', transactionUuid);
    }
  }
}
