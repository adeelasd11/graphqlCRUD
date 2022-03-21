import { FastifyRequest } from "fastify";
import { ObjectId, FilterQuery } from "mongoose";
import { MUser } from "./../models/MUser.js";
import { fieldsList, fieldsMap,fieldsProjection } from "graphql-fields-list";
import { IUser } from "../types/IUsers.js";
import { mongo } from "../models/DB.js";
import { GraphQLResolveInfo } from "graphql/type/definition";

/**
 * get Userss
 * @param _
 * @param data
 * @param body
 * @param select
 * @returns
 */
export const getUsers = async (
  _: any,
  data: any,
  body: FastifyRequest,
  select: any
) => {
  let promises: Promise<any>[] = [];
  let take = select.variableValues?.take ?? 10;
  let skip = select.variableValues?.skip ?? 0;
  let sort = select.variableValues?.sort;
  let order = select.variableValues?.order;
  let search = select.variableValues?.search;

  const fieldList = fieldsMap(select);
  const keys: String[] =Object.keys(fieldList.docs);

  const filterQueryUser: FilterQuery<IUser> = {
    ...(search
      ? {
          $or: [
            {
              name: {
                $regex: search,
                $options: "i",
              },
            },
            {
              email: {
                $regex: search,
                $options: "i",
              },
            },
          ],
        }
      : {}),
  };
  if (keys.length)
    promises.push(
      MUser.find(filterQueryUser, keys.join(" "), {
        limit: take,
        skip,
        ...(sort
          ? {
              sort: {
                [sort]: order == "asc" ? 1 : -1,
              },
            }
          : {}),
      })
        .lean()
        .exec()
    );

  if (fieldList.count !==undefined) {
    promises.push(MUser.countDocuments(filterQueryUser).lean().exec());
  }

  const [user, count] = await Promise.all(promises);
  return {
    docs: user ?? [],
    count: count ? count : Array.isArray(user) ? 0 : user,
  };
};

/**
 * @description Adds User
 * @param _
 * @param data
 * @param body
 * @param select
 * @returns
 */
export const upsertUser = async (
  _: any,
  data: { input: IUser },
  body: any,
  select: any
) => {
  const userData = data.input;
  const _id: any = data.input._id ?? new mongo.ObjectId();
  delete userData._id;
  const user = await MUser.findOneAndUpdate(
    { _id: _id },
    { $set: userData },
    { upsert: true, new: true }
  );
  return user;
};

/**
 *
 * @param _
 * @param data
 * @param body
 * @param select
 * @returns
 */

export const deleteUser = async (
  _: any,
  data: { input: number },
  body: any,
  select: any
) => {
  const fieldList = fieldsList(select);

  const user = await MUser.findOneAndDelete(
    { _id: data.input },
    { projection: fieldList.join(" ") }
  );
  return user;
};

/**
 * get Userss
 * @param _
 * @param data
 * @param body
 * @param select
 * @returns
 */
export const getUser = async (
  _: any,
  data: any,
  body: any,
  select: GraphQLResolveInfo
) => {
  let id = select.variableValues.id;
  const fieldList = fieldsList(select);
  console.log(fieldList)
  const user = await MUser.findById(id, fieldList.join(" "));
  return user;
};
