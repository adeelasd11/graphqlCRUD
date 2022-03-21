import { GraphQLResolveInfo } from 'graphql/type/definition';
import { FastifyRequest } from 'fastify';
import {} from "graphql";

export type IGraphResolverQuery =  (parent: any, data: {},context:FastifyRequest,info:GraphQLResolveInfo) => any;
export type IGraphResolverMut<T> =(parent: any, data: T,context:FastifyRequest,info:GraphQLResolveInfo) => any;
