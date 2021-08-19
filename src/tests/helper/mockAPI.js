import * as requestMenu from '../../services/requestMenu';

export const mockFilterDrinkByCategory = (category) => (
  jest
    .spyOn(requestMenu, 'filterDrinkByCategory')
    .mockImplementation(() => Promise.resolve(category))
);

export const mockFilterMealByCategory = (category) => (
  jest
    .spyOn(requestMenu, 'filterMealByCategory')
    .mockImplementation(() => Promise.resolve(category))
);
