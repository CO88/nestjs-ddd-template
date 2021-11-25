import { EntityManager, getConnection, QueryRunner } from 'typeorm';

export class TypeOrmUnitOfWork {
  private queryRunners: Map<string, QueryRunner> = new Map();

  async start(transanctionUuid: string): Promise<void> {
    const queryRunner = getConnection().createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    this.queryRunners.set(transanctionUuid, queryRunner);
  }

  getEntityManager(transanctionUuid: string): EntityManager {
    return this.queryRunners.get(transanctionUuid).manager;
  }

  private getQueryRunner(transactionUuid: string): QueryRunner {
    return this.queryRunners.get(transactionUuid);
  }

  async commit(transactionUuid: string): Promise<void> {
    const queryRunner = this.getQueryRunner(transactionUuid);
    try {
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
      this.queryRunners.delete(transactionUuid);
    }
  }
}
