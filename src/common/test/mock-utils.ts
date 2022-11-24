export type MockUtils<T> = {
  [P in keyof T]?: jest.Mock<unknown>
}
