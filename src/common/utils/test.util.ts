import { Repository } from 'typeorm';

export const mockPostRepository = () => ({
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  softDelete: jest.fn(),
});

export type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
