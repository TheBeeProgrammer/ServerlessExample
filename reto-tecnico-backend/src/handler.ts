import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
// eslint-disable-next-line import/no-unresolved
import { echo } from '@lib/exampleQuery';
import { SwapiServiceImpl } from './service/SwapiServiceImpl';
import { EmployeeServiceImpl } from './service/EmployeeServiceImpl';
import { Employee } from './domain/repositories/model/Employee';


export const hello: APIGatewayProxyHandler = async (event, _context) => ({
  statusCode: 200,
  body: JSON.stringify(
    {
      message: echo('Module aliasing is really the more best'),
      input: event,
    },
    null,
  ),
});

export const rootData: APIGatewayProxyHandler = async (event, context) => {
  console.log(event, 'event');
  console.log(context, 'context');
  const swappiServiceImpl = new SwapiServiceImpl();
  const rootDataResponse = await swappiServiceImpl.getRootData();

  return {
    statusCode: 200,
    body: JSON.stringify(
      rootDataResponse,
    ),
  };
};

export const starShips: APIGatewayProxyHandler = async (event, context) => {
  console.log(event, 'event');
  console.log(context, 'context');
  const swappiServiceImpl = new SwapiServiceImpl();
  const startShipsResponse = await swappiServiceImpl.getStarShipsData();

  return {
    statusCode: 200,
    body: JSON.stringify(
      startShipsResponse,
    ),
  };
};

export const employeeCreate = async (event) => {
  console.log(event, 'event');
  const employeeServiceImpl = new EmployeeServiceImpl();
  if (event.body == null) throw new Error('BODY IS EMPTY');
  await employeeServiceImpl.saveEmployee(JSON.parse(event.body) as Employee);

  return {
    statusCode: 201,
  };
};
