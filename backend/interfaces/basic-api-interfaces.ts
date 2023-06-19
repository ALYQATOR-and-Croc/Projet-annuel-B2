export interface RequestInterface {
  app: { get: (arg0: string) => string };
}
export interface ResponseInterface {
  locals: { message: any; error: any };
  status: (arg0: any) => void;
  render: (arg0: string) => void;
}
export interface RequestErrorInterface {
  message: any;
  status: any;
}
