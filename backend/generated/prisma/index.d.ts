
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Address
 * 
 */
export type Address = $Result.DefaultSelection<Prisma.$AddressPayload>
/**
 * Model Registration
 * 
 */
export type Registration = $Result.DefaultSelection<Prisma.$RegistrationPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const GENDER: {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
  OTHER: 'OTHER'
};

export type GENDER = (typeof GENDER)[keyof typeof GENDER]


export const Institutes: {
  Parul_Institue_of_Engineering_and_Technology: 'Parul_Institue_of_Engineering_and_Technology',
  Parul_Institue_of_Technology: 'Parul_Institue_of_Technology',
  Parul_Institue_of_Design: 'Parul_Institue_of_Design',
  Parul_Institute_of_Management: 'Parul_Institute_of_Management',
  Parul_Institute_of_Design: 'Parul_Institute_of_Design',
  Parul_Institute_of_Applied_Sciences: 'Parul_Institute_of_Applied_Sciences',
  Parul_Institute_of_Medical_Science_and_Research: 'Parul_Institute_of_Medical_Science_and_Research',
  Parul_Institute_of_Pharmacy_and_Research: 'Parul_Institute_of_Pharmacy_and_Research',
  Parul_Institute_of_Ayurveda_and_Research: 'Parul_Institute_of_Ayurveda_and_Research',
  Parul_Institute_of_Hotel_Management_and_Catering_Technology: 'Parul_Institute_of_Hotel_Management_and_Catering_Technology',
  Parul_Polytechnic_Institute: 'Parul_Polytechnic_Institute'
};

export type Institutes = (typeof Institutes)[keyof typeof Institutes]


export const Degree: {
  BTech: 'BTech',
  MTech: 'MTech',
  PhD: 'PhD',
  BSc: 'BSc',
  MSc: 'MSc',
  Pharmacy: 'Pharmacy',
  MBA: 'MBA'
};

export type Degree = (typeof Degree)[keyof typeof Degree]


export const LevelofEduction: {
  Graduate: 'Graduate',
  PostGraduate: 'PostGraduate',
  Doctorate: 'Doctorate'
};

export type LevelofEduction = (typeof LevelofEduction)[keyof typeof LevelofEduction]

}

export type GENDER = $Enums.GENDER

export const GENDER: typeof $Enums.GENDER

export type Institutes = $Enums.Institutes

export const Institutes: typeof $Enums.Institutes

export type Degree = $Enums.Degree

export const Degree: typeof $Enums.Degree

export type LevelofEduction = $Enums.LevelofEduction

export const LevelofEduction: typeof $Enums.LevelofEduction

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Registrations
 * const registrations = await prisma.registration.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Registrations
   * const registrations = await prisma.registration.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P]): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number }): $Utils.JsPromise<R>

  /**
   * Executes a raw MongoDB command and returns the result of it.
   * @example
   * ```
   * const user = await prisma.$runCommandRaw({
   *   aggregate: 'User',
   *   pipeline: [{ $match: { name: 'Bob' } }, { $project: { email: true, _id: false } }],
   *   explain: false,
   * })
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $runCommandRaw(command: Prisma.InputJsonObject): Prisma.PrismaPromise<Prisma.JsonObject>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.registration`: Exposes CRUD operations for the **Registration** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Registrations
    * const registrations = await prisma.registration.findMany()
    * ```
    */
  get registration(): Prisma.RegistrationDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.7.0
   * Query Engine version: 3cff47a7f5d65c3ea74883f1d736e41d68ce91ed
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Registration: 'Registration'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "registration"
      txIsolationLevel: never
    }
    model: {
      Registration: {
        payload: Prisma.$RegistrationPayload<ExtArgs>
        fields: Prisma.RegistrationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RegistrationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistrationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RegistrationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistrationPayload>
          }
          findFirst: {
            args: Prisma.RegistrationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistrationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RegistrationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistrationPayload>
          }
          findMany: {
            args: Prisma.RegistrationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistrationPayload>[]
          }
          create: {
            args: Prisma.RegistrationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistrationPayload>
          }
          createMany: {
            args: Prisma.RegistrationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.RegistrationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistrationPayload>
          }
          update: {
            args: Prisma.RegistrationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistrationPayload>
          }
          deleteMany: {
            args: Prisma.RegistrationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RegistrationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RegistrationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegistrationPayload>
          }
          aggregate: {
            args: Prisma.RegistrationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRegistration>
          }
          groupBy: {
            args: Prisma.RegistrationGroupByArgs<ExtArgs>
            result: $Utils.Optional<RegistrationGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.RegistrationFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.RegistrationAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.RegistrationCountArgs<ExtArgs>
            result: $Utils.Optional<RegistrationCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $runCommandRaw: {
          args: Prisma.InputJsonObject,
          result: Prisma.JsonObject
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    registration?: RegistrationOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model Address
   */





  export type AddressSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    placeOfWork?: boolean
    state?: boolean
    city?: boolean
  }, ExtArgs["result"]["address"]>



  export type AddressSelectScalar = {
    placeOfWork?: boolean
    state?: boolean
    city?: boolean
  }

  export type AddressOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"placeOfWork" | "state" | "city", ExtArgs["result"]["address"]>

  export type $AddressPayload = {
    name: "Address"
    objects: {}
    scalars: {
      placeOfWork: string
      state: string
      city: string
    }
    composites: {}
  }

  type AddressGetPayload<S extends boolean | null | undefined | AddressDefaultArgs> = $Result.GetResult<Prisma.$AddressPayload, S>





  /**
   * Fields of the Address model
   */
  interface AddressFieldRefs {
    readonly placeOfWork: FieldRef<"Address", 'String'>
    readonly state: FieldRef<"Address", 'String'>
    readonly city: FieldRef<"Address", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Address without action
   */
  export type AddressDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Address
     */
    select?: AddressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Address
     */
    omit?: AddressOmit<ExtArgs> | null
  }


  /**
   * Model Registration
   */

  export type AggregateRegistration = {
    _count: RegistrationCountAggregateOutputType | null
    _avg: RegistrationAvgAggregateOutputType | null
    _sum: RegistrationSumAggregateOutputType | null
    _min: RegistrationMinAggregateOutputType | null
    _max: RegistrationMaxAggregateOutputType | null
  }

  export type RegistrationAvgAggregateOutputType = {
    startingYear: number | null
    YearofPassing: number | null
    WorkExp: number | null
  }

  export type RegistrationSumAggregateOutputType = {
    startingYear: bigint | null
    YearofPassing: bigint | null
    WorkExp: number | null
  }

  export type RegistrationMinAggregateOutputType = {
    id: string | null
    email: string | null
    FirstName: string | null
    LastName: string | null
    primaryEmailId: string | null
    secondaryEmailId: string | null
    Gender: $Enums.GENDER | null
    DateofBirth: Date | null
    startingYear: bigint | null
    YearofPassing: bigint | null
    Institution: $Enums.Institutes | null
    Degree: $Enums.Degree | null
    Specialization: string | null
    optedForHigherEducationfromOtherInstitues: boolean | null
    highestLevelOfEduction: $Enums.LevelofEduction | null
    UniversityofHigherEducdation: string | null
    Company: string | null
    Title: string | null
    Industry: string | null
    WorkExp: number | null
    PlaceofWork: string | null
  }

  export type RegistrationMaxAggregateOutputType = {
    id: string | null
    email: string | null
    FirstName: string | null
    LastName: string | null
    primaryEmailId: string | null
    secondaryEmailId: string | null
    Gender: $Enums.GENDER | null
    DateofBirth: Date | null
    startingYear: bigint | null
    YearofPassing: bigint | null
    Institution: $Enums.Institutes | null
    Degree: $Enums.Degree | null
    Specialization: string | null
    optedForHigherEducationfromOtherInstitues: boolean | null
    highestLevelOfEduction: $Enums.LevelofEduction | null
    UniversityofHigherEducdation: string | null
    Company: string | null
    Title: string | null
    Industry: string | null
    WorkExp: number | null
    PlaceofWork: string | null
  }

  export type RegistrationCountAggregateOutputType = {
    id: number
    email: number
    FirstName: number
    LastName: number
    primaryEmailId: number
    secondaryEmailId: number
    Gender: number
    DateofBirth: number
    startingYear: number
    YearofPassing: number
    Institution: number
    Degree: number
    Specialization: number
    optedForHigherEducationfromOtherInstitues: number
    highestLevelOfEduction: number
    UniversityofHigherEducdation: number
    Company: number
    Title: number
    Industry: number
    WorkExp: number
    PlaceofWork: number
    Skills: number
    _all: number
  }


  export type RegistrationAvgAggregateInputType = {
    startingYear?: true
    YearofPassing?: true
    WorkExp?: true
  }

  export type RegistrationSumAggregateInputType = {
    startingYear?: true
    YearofPassing?: true
    WorkExp?: true
  }

  export type RegistrationMinAggregateInputType = {
    id?: true
    email?: true
    FirstName?: true
    LastName?: true
    primaryEmailId?: true
    secondaryEmailId?: true
    Gender?: true
    DateofBirth?: true
    startingYear?: true
    YearofPassing?: true
    Institution?: true
    Degree?: true
    Specialization?: true
    optedForHigherEducationfromOtherInstitues?: true
    highestLevelOfEduction?: true
    UniversityofHigherEducdation?: true
    Company?: true
    Title?: true
    Industry?: true
    WorkExp?: true
    PlaceofWork?: true
  }

  export type RegistrationMaxAggregateInputType = {
    id?: true
    email?: true
    FirstName?: true
    LastName?: true
    primaryEmailId?: true
    secondaryEmailId?: true
    Gender?: true
    DateofBirth?: true
    startingYear?: true
    YearofPassing?: true
    Institution?: true
    Degree?: true
    Specialization?: true
    optedForHigherEducationfromOtherInstitues?: true
    highestLevelOfEduction?: true
    UniversityofHigherEducdation?: true
    Company?: true
    Title?: true
    Industry?: true
    WorkExp?: true
    PlaceofWork?: true
  }

  export type RegistrationCountAggregateInputType = {
    id?: true
    email?: true
    FirstName?: true
    LastName?: true
    primaryEmailId?: true
    secondaryEmailId?: true
    Gender?: true
    DateofBirth?: true
    startingYear?: true
    YearofPassing?: true
    Institution?: true
    Degree?: true
    Specialization?: true
    optedForHigherEducationfromOtherInstitues?: true
    highestLevelOfEduction?: true
    UniversityofHigherEducdation?: true
    Company?: true
    Title?: true
    Industry?: true
    WorkExp?: true
    PlaceofWork?: true
    Skills?: true
    _all?: true
  }

  export type RegistrationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Registration to aggregate.
     */
    where?: RegistrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Registrations to fetch.
     */
    orderBy?: RegistrationOrderByWithRelationInput | RegistrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RegistrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Registrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Registrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Registrations
    **/
    _count?: true | RegistrationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RegistrationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RegistrationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RegistrationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RegistrationMaxAggregateInputType
  }

  export type GetRegistrationAggregateType<T extends RegistrationAggregateArgs> = {
        [P in keyof T & keyof AggregateRegistration]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRegistration[P]>
      : GetScalarType<T[P], AggregateRegistration[P]>
  }




  export type RegistrationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RegistrationWhereInput
    orderBy?: RegistrationOrderByWithAggregationInput | RegistrationOrderByWithAggregationInput[]
    by: RegistrationScalarFieldEnum[] | RegistrationScalarFieldEnum
    having?: RegistrationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RegistrationCountAggregateInputType | true
    _avg?: RegistrationAvgAggregateInputType
    _sum?: RegistrationSumAggregateInputType
    _min?: RegistrationMinAggregateInputType
    _max?: RegistrationMaxAggregateInputType
  }

  export type RegistrationGroupByOutputType = {
    id: string
    email: string
    FirstName: string | null
    LastName: string | null
    primaryEmailId: string
    secondaryEmailId: string
    Gender: $Enums.GENDER
    DateofBirth: Date
    startingYear: bigint
    YearofPassing: bigint | null
    Institution: $Enums.Institutes
    Degree: $Enums.Degree
    Specialization: string
    optedForHigherEducationfromOtherInstitues: boolean
    highestLevelOfEduction: $Enums.LevelofEduction
    UniversityofHigherEducdation: string | null
    Company: string | null
    Title: string | null
    Industry: string | null
    WorkExp: number | null
    PlaceofWork: string | null
    Skills: string[]
    _count: RegistrationCountAggregateOutputType | null
    _avg: RegistrationAvgAggregateOutputType | null
    _sum: RegistrationSumAggregateOutputType | null
    _min: RegistrationMinAggregateOutputType | null
    _max: RegistrationMaxAggregateOutputType | null
  }

  type GetRegistrationGroupByPayload<T extends RegistrationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RegistrationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RegistrationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RegistrationGroupByOutputType[P]>
            : GetScalarType<T[P], RegistrationGroupByOutputType[P]>
        }
      >
    >


  export type RegistrationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    FirstName?: boolean
    LastName?: boolean
    primaryEmailId?: boolean
    secondaryEmailId?: boolean
    Gender?: boolean
    DateofBirth?: boolean
    startingYear?: boolean
    YearofPassing?: boolean
    Institution?: boolean
    Degree?: boolean
    Specialization?: boolean
    optedForHigherEducationfromOtherInstitues?: boolean
    highestLevelOfEduction?: boolean
    UniversityofHigherEducdation?: boolean
    Company?: boolean
    Title?: boolean
    Industry?: boolean
    WorkExp?: boolean
    PlaceofWork?: boolean
    Skills?: boolean
    currentAddress?: boolean | AddressDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["registration"]>



  export type RegistrationSelectScalar = {
    id?: boolean
    email?: boolean
    FirstName?: boolean
    LastName?: boolean
    primaryEmailId?: boolean
    secondaryEmailId?: boolean
    Gender?: boolean
    DateofBirth?: boolean
    startingYear?: boolean
    YearofPassing?: boolean
    Institution?: boolean
    Degree?: boolean
    Specialization?: boolean
    optedForHigherEducationfromOtherInstitues?: boolean
    highestLevelOfEduction?: boolean
    UniversityofHigherEducdation?: boolean
    Company?: boolean
    Title?: boolean
    Industry?: boolean
    WorkExp?: boolean
    PlaceofWork?: boolean
    Skills?: boolean
  }

  export type RegistrationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "FirstName" | "LastName" | "primaryEmailId" | "secondaryEmailId" | "Gender" | "DateofBirth" | "startingYear" | "YearofPassing" | "Institution" | "Degree" | "Specialization" | "optedForHigherEducationfromOtherInstitues" | "highestLevelOfEduction" | "UniversityofHigherEducdation" | "Company" | "Title" | "Industry" | "WorkExp" | "PlaceofWork" | "Skills" | "currentAddress", ExtArgs["result"]["registration"]>
  export type RegistrationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $RegistrationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Registration"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      FirstName: string | null
      LastName: string | null
      primaryEmailId: string
      secondaryEmailId: string
      Gender: $Enums.GENDER
      DateofBirth: Date
      startingYear: bigint
      YearofPassing: bigint | null
      Institution: $Enums.Institutes
      Degree: $Enums.Degree
      Specialization: string
      optedForHigherEducationfromOtherInstitues: boolean
      highestLevelOfEduction: $Enums.LevelofEduction
      UniversityofHigherEducdation: string | null
      Company: string | null
      Title: string | null
      Industry: string | null
      WorkExp: number | null
      PlaceofWork: string | null
      Skills: string[]
    }, ExtArgs["result"]["registration"]>
    composites: {
      currentAddress: Prisma.$AddressPayload
    }
  }

  type RegistrationGetPayload<S extends boolean | null | undefined | RegistrationDefaultArgs> = $Result.GetResult<Prisma.$RegistrationPayload, S>

  type RegistrationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RegistrationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RegistrationCountAggregateInputType | true
    }

  export interface RegistrationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Registration'], meta: { name: 'Registration' } }
    /**
     * Find zero or one Registration that matches the filter.
     * @param {RegistrationFindUniqueArgs} args - Arguments to find a Registration
     * @example
     * // Get one Registration
     * const registration = await prisma.registration.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RegistrationFindUniqueArgs>(args: SelectSubset<T, RegistrationFindUniqueArgs<ExtArgs>>): Prisma__RegistrationClient<$Result.GetResult<Prisma.$RegistrationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Registration that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RegistrationFindUniqueOrThrowArgs} args - Arguments to find a Registration
     * @example
     * // Get one Registration
     * const registration = await prisma.registration.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RegistrationFindUniqueOrThrowArgs>(args: SelectSubset<T, RegistrationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RegistrationClient<$Result.GetResult<Prisma.$RegistrationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Registration that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistrationFindFirstArgs} args - Arguments to find a Registration
     * @example
     * // Get one Registration
     * const registration = await prisma.registration.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RegistrationFindFirstArgs>(args?: SelectSubset<T, RegistrationFindFirstArgs<ExtArgs>>): Prisma__RegistrationClient<$Result.GetResult<Prisma.$RegistrationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Registration that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistrationFindFirstOrThrowArgs} args - Arguments to find a Registration
     * @example
     * // Get one Registration
     * const registration = await prisma.registration.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RegistrationFindFirstOrThrowArgs>(args?: SelectSubset<T, RegistrationFindFirstOrThrowArgs<ExtArgs>>): Prisma__RegistrationClient<$Result.GetResult<Prisma.$RegistrationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Registrations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistrationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Registrations
     * const registrations = await prisma.registration.findMany()
     * 
     * // Get first 10 Registrations
     * const registrations = await prisma.registration.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const registrationWithIdOnly = await prisma.registration.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RegistrationFindManyArgs>(args?: SelectSubset<T, RegistrationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RegistrationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Registration.
     * @param {RegistrationCreateArgs} args - Arguments to create a Registration.
     * @example
     * // Create one Registration
     * const Registration = await prisma.registration.create({
     *   data: {
     *     // ... data to create a Registration
     *   }
     * })
     * 
     */
    create<T extends RegistrationCreateArgs>(args: SelectSubset<T, RegistrationCreateArgs<ExtArgs>>): Prisma__RegistrationClient<$Result.GetResult<Prisma.$RegistrationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Registrations.
     * @param {RegistrationCreateManyArgs} args - Arguments to create many Registrations.
     * @example
     * // Create many Registrations
     * const registration = await prisma.registration.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RegistrationCreateManyArgs>(args?: SelectSubset<T, RegistrationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Registration.
     * @param {RegistrationDeleteArgs} args - Arguments to delete one Registration.
     * @example
     * // Delete one Registration
     * const Registration = await prisma.registration.delete({
     *   where: {
     *     // ... filter to delete one Registration
     *   }
     * })
     * 
     */
    delete<T extends RegistrationDeleteArgs>(args: SelectSubset<T, RegistrationDeleteArgs<ExtArgs>>): Prisma__RegistrationClient<$Result.GetResult<Prisma.$RegistrationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Registration.
     * @param {RegistrationUpdateArgs} args - Arguments to update one Registration.
     * @example
     * // Update one Registration
     * const registration = await prisma.registration.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RegistrationUpdateArgs>(args: SelectSubset<T, RegistrationUpdateArgs<ExtArgs>>): Prisma__RegistrationClient<$Result.GetResult<Prisma.$RegistrationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Registrations.
     * @param {RegistrationDeleteManyArgs} args - Arguments to filter Registrations to delete.
     * @example
     * // Delete a few Registrations
     * const { count } = await prisma.registration.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RegistrationDeleteManyArgs>(args?: SelectSubset<T, RegistrationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Registrations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistrationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Registrations
     * const registration = await prisma.registration.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RegistrationUpdateManyArgs>(args: SelectSubset<T, RegistrationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Registration.
     * @param {RegistrationUpsertArgs} args - Arguments to update or create a Registration.
     * @example
     * // Update or create a Registration
     * const registration = await prisma.registration.upsert({
     *   create: {
     *     // ... data to create a Registration
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Registration we want to update
     *   }
     * })
     */
    upsert<T extends RegistrationUpsertArgs>(args: SelectSubset<T, RegistrationUpsertArgs<ExtArgs>>): Prisma__RegistrationClient<$Result.GetResult<Prisma.$RegistrationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Registrations that matches the filter.
     * @param {RegistrationFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const registration = await prisma.registration.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: RegistrationFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Registration.
     * @param {RegistrationAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const registration = await prisma.registration.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: RegistrationAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Registrations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistrationCountArgs} args - Arguments to filter Registrations to count.
     * @example
     * // Count the number of Registrations
     * const count = await prisma.registration.count({
     *   where: {
     *     // ... the filter for the Registrations we want to count
     *   }
     * })
    **/
    count<T extends RegistrationCountArgs>(
      args?: Subset<T, RegistrationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RegistrationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Registration.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistrationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RegistrationAggregateArgs>(args: Subset<T, RegistrationAggregateArgs>): Prisma.PrismaPromise<GetRegistrationAggregateType<T>>

    /**
     * Group by Registration.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegistrationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RegistrationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RegistrationGroupByArgs['orderBy'] }
        : { orderBy?: RegistrationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RegistrationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRegistrationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Registration model
   */
  readonly fields: RegistrationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Registration.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RegistrationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Registration model
   */
  interface RegistrationFieldRefs {
    readonly id: FieldRef<"Registration", 'String'>
    readonly email: FieldRef<"Registration", 'String'>
    readonly FirstName: FieldRef<"Registration", 'String'>
    readonly LastName: FieldRef<"Registration", 'String'>
    readonly primaryEmailId: FieldRef<"Registration", 'String'>
    readonly secondaryEmailId: FieldRef<"Registration", 'String'>
    readonly Gender: FieldRef<"Registration", 'GENDER'>
    readonly DateofBirth: FieldRef<"Registration", 'DateTime'>
    readonly startingYear: FieldRef<"Registration", 'BigInt'>
    readonly YearofPassing: FieldRef<"Registration", 'BigInt'>
    readonly Institution: FieldRef<"Registration", 'Institutes'>
    readonly Degree: FieldRef<"Registration", 'Degree'>
    readonly Specialization: FieldRef<"Registration", 'String'>
    readonly optedForHigherEducationfromOtherInstitues: FieldRef<"Registration", 'Boolean'>
    readonly highestLevelOfEduction: FieldRef<"Registration", 'LevelofEduction'>
    readonly UniversityofHigherEducdation: FieldRef<"Registration", 'String'>
    readonly Company: FieldRef<"Registration", 'String'>
    readonly Title: FieldRef<"Registration", 'String'>
    readonly Industry: FieldRef<"Registration", 'String'>
    readonly WorkExp: FieldRef<"Registration", 'Int'>
    readonly PlaceofWork: FieldRef<"Registration", 'String'>
    readonly Skills: FieldRef<"Registration", 'String[]'>
  }
    

  // Custom InputTypes
  /**
   * Registration findUnique
   */
  export type RegistrationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Registration
     */
    select?: RegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Registration
     */
    omit?: RegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistrationInclude<ExtArgs> | null
    /**
     * Filter, which Registration to fetch.
     */
    where: RegistrationWhereUniqueInput
  }

  /**
   * Registration findUniqueOrThrow
   */
  export type RegistrationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Registration
     */
    select?: RegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Registration
     */
    omit?: RegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistrationInclude<ExtArgs> | null
    /**
     * Filter, which Registration to fetch.
     */
    where: RegistrationWhereUniqueInput
  }

  /**
   * Registration findFirst
   */
  export type RegistrationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Registration
     */
    select?: RegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Registration
     */
    omit?: RegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistrationInclude<ExtArgs> | null
    /**
     * Filter, which Registration to fetch.
     */
    where?: RegistrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Registrations to fetch.
     */
    orderBy?: RegistrationOrderByWithRelationInput | RegistrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Registrations.
     */
    cursor?: RegistrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Registrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Registrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Registrations.
     */
    distinct?: RegistrationScalarFieldEnum | RegistrationScalarFieldEnum[]
  }

  /**
   * Registration findFirstOrThrow
   */
  export type RegistrationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Registration
     */
    select?: RegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Registration
     */
    omit?: RegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistrationInclude<ExtArgs> | null
    /**
     * Filter, which Registration to fetch.
     */
    where?: RegistrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Registrations to fetch.
     */
    orderBy?: RegistrationOrderByWithRelationInput | RegistrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Registrations.
     */
    cursor?: RegistrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Registrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Registrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Registrations.
     */
    distinct?: RegistrationScalarFieldEnum | RegistrationScalarFieldEnum[]
  }

  /**
   * Registration findMany
   */
  export type RegistrationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Registration
     */
    select?: RegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Registration
     */
    omit?: RegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistrationInclude<ExtArgs> | null
    /**
     * Filter, which Registrations to fetch.
     */
    where?: RegistrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Registrations to fetch.
     */
    orderBy?: RegistrationOrderByWithRelationInput | RegistrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Registrations.
     */
    cursor?: RegistrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Registrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Registrations.
     */
    skip?: number
    distinct?: RegistrationScalarFieldEnum | RegistrationScalarFieldEnum[]
  }

  /**
   * Registration create
   */
  export type RegistrationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Registration
     */
    select?: RegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Registration
     */
    omit?: RegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistrationInclude<ExtArgs> | null
    /**
     * The data needed to create a Registration.
     */
    data: XOR<RegistrationCreateInput, RegistrationUncheckedCreateInput>
  }

  /**
   * Registration createMany
   */
  export type RegistrationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Registrations.
     */
    data: RegistrationCreateManyInput | RegistrationCreateManyInput[]
  }

  /**
   * Registration update
   */
  export type RegistrationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Registration
     */
    select?: RegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Registration
     */
    omit?: RegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistrationInclude<ExtArgs> | null
    /**
     * The data needed to update a Registration.
     */
    data: XOR<RegistrationUpdateInput, RegistrationUncheckedUpdateInput>
    /**
     * Choose, which Registration to update.
     */
    where: RegistrationWhereUniqueInput
  }

  /**
   * Registration updateMany
   */
  export type RegistrationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Registrations.
     */
    data: XOR<RegistrationUpdateManyMutationInput, RegistrationUncheckedUpdateManyInput>
    /**
     * Filter which Registrations to update
     */
    where?: RegistrationWhereInput
    /**
     * Limit how many Registrations to update.
     */
    limit?: number
  }

  /**
   * Registration upsert
   */
  export type RegistrationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Registration
     */
    select?: RegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Registration
     */
    omit?: RegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistrationInclude<ExtArgs> | null
    /**
     * The filter to search for the Registration to update in case it exists.
     */
    where: RegistrationWhereUniqueInput
    /**
     * In case the Registration found by the `where` argument doesn't exist, create a new Registration with this data.
     */
    create: XOR<RegistrationCreateInput, RegistrationUncheckedCreateInput>
    /**
     * In case the Registration was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RegistrationUpdateInput, RegistrationUncheckedUpdateInput>
  }

  /**
   * Registration delete
   */
  export type RegistrationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Registration
     */
    select?: RegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Registration
     */
    omit?: RegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistrationInclude<ExtArgs> | null
    /**
     * Filter which Registration to delete.
     */
    where: RegistrationWhereUniqueInput
  }

  /**
   * Registration deleteMany
   */
  export type RegistrationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Registrations to delete
     */
    where?: RegistrationWhereInput
    /**
     * Limit how many Registrations to delete.
     */
    limit?: number
  }

  /**
   * Registration findRaw
   */
  export type RegistrationFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Registration aggregateRaw
   */
  export type RegistrationAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Registration without action
   */
  export type RegistrationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Registration
     */
    select?: RegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Registration
     */
    omit?: RegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegistrationInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const RegistrationScalarFieldEnum: {
    id: 'id',
    email: 'email',
    FirstName: 'FirstName',
    LastName: 'LastName',
    primaryEmailId: 'primaryEmailId',
    secondaryEmailId: 'secondaryEmailId',
    Gender: 'Gender',
    DateofBirth: 'DateofBirth',
    startingYear: 'startingYear',
    YearofPassing: 'YearofPassing',
    Institution: 'Institution',
    Degree: 'Degree',
    Specialization: 'Specialization',
    optedForHigherEducationfromOtherInstitues: 'optedForHigherEducationfromOtherInstitues',
    highestLevelOfEduction: 'highestLevelOfEduction',
    UniversityofHigherEducdation: 'UniversityofHigherEducdation',
    Company: 'Company',
    Title: 'Title',
    Industry: 'Industry',
    WorkExp: 'WorkExp',
    PlaceofWork: 'PlaceofWork',
    Skills: 'Skills'
  };

  export type RegistrationScalarFieldEnum = (typeof RegistrationScalarFieldEnum)[keyof typeof RegistrationScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'GENDER'
   */
  export type EnumGENDERFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'GENDER'>
    


  /**
   * Reference to a field of type 'GENDER[]'
   */
  export type ListEnumGENDERFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'GENDER[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'Institutes'
   */
  export type EnumInstitutesFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Institutes'>
    


  /**
   * Reference to a field of type 'Institutes[]'
   */
  export type ListEnumInstitutesFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Institutes[]'>
    


  /**
   * Reference to a field of type 'Degree'
   */
  export type EnumDegreeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Degree'>
    


  /**
   * Reference to a field of type 'Degree[]'
   */
  export type ListEnumDegreeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Degree[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'LevelofEduction'
   */
  export type EnumLevelofEductionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LevelofEduction'>
    


  /**
   * Reference to a field of type 'LevelofEduction[]'
   */
  export type ListEnumLevelofEductionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LevelofEduction[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type RegistrationWhereInput = {
    AND?: RegistrationWhereInput | RegistrationWhereInput[]
    OR?: RegistrationWhereInput[]
    NOT?: RegistrationWhereInput | RegistrationWhereInput[]
    id?: StringFilter<"Registration"> | string
    email?: StringFilter<"Registration"> | string
    FirstName?: StringNullableFilter<"Registration"> | string | null
    LastName?: StringNullableFilter<"Registration"> | string | null
    primaryEmailId?: StringFilter<"Registration"> | string
    secondaryEmailId?: StringFilter<"Registration"> | string
    Gender?: EnumGENDERFilter<"Registration"> | $Enums.GENDER
    DateofBirth?: DateTimeFilter<"Registration"> | Date | string
    startingYear?: BigIntFilter<"Registration"> | bigint | number
    YearofPassing?: BigIntNullableFilter<"Registration"> | bigint | number | null
    Institution?: EnumInstitutesFilter<"Registration"> | $Enums.Institutes
    Degree?: EnumDegreeFilter<"Registration"> | $Enums.Degree
    Specialization?: StringFilter<"Registration"> | string
    optedForHigherEducationfromOtherInstitues?: BoolFilter<"Registration"> | boolean
    highestLevelOfEduction?: EnumLevelofEductionFilter<"Registration"> | $Enums.LevelofEduction
    UniversityofHigherEducdation?: StringNullableFilter<"Registration"> | string | null
    Company?: StringNullableFilter<"Registration"> | string | null
    Title?: StringNullableFilter<"Registration"> | string | null
    Industry?: StringNullableFilter<"Registration"> | string | null
    WorkExp?: IntNullableFilter<"Registration"> | number | null
    PlaceofWork?: StringNullableFilter<"Registration"> | string | null
    Skills?: StringNullableListFilter<"Registration">
    currentAddress?: XOR<AddressCompositeFilter, AddressObjectEqualityInput>
  }

  export type RegistrationOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    FirstName?: SortOrder
    LastName?: SortOrder
    primaryEmailId?: SortOrder
    secondaryEmailId?: SortOrder
    Gender?: SortOrder
    DateofBirth?: SortOrder
    startingYear?: SortOrder
    YearofPassing?: SortOrder
    Institution?: SortOrder
    Degree?: SortOrder
    Specialization?: SortOrder
    optedForHigherEducationfromOtherInstitues?: SortOrder
    highestLevelOfEduction?: SortOrder
    UniversityofHigherEducdation?: SortOrder
    Company?: SortOrder
    Title?: SortOrder
    Industry?: SortOrder
    WorkExp?: SortOrder
    PlaceofWork?: SortOrder
    Skills?: SortOrder
    currentAddress?: AddressOrderByInput
  }

  export type RegistrationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    primaryEmailId?: string
    secondaryEmailId?: string
    AND?: RegistrationWhereInput | RegistrationWhereInput[]
    OR?: RegistrationWhereInput[]
    NOT?: RegistrationWhereInput | RegistrationWhereInput[]
    FirstName?: StringNullableFilter<"Registration"> | string | null
    LastName?: StringNullableFilter<"Registration"> | string | null
    Gender?: EnumGENDERFilter<"Registration"> | $Enums.GENDER
    DateofBirth?: DateTimeFilter<"Registration"> | Date | string
    startingYear?: BigIntFilter<"Registration"> | bigint | number
    YearofPassing?: BigIntNullableFilter<"Registration"> | bigint | number | null
    Institution?: EnumInstitutesFilter<"Registration"> | $Enums.Institutes
    Degree?: EnumDegreeFilter<"Registration"> | $Enums.Degree
    Specialization?: StringFilter<"Registration"> | string
    optedForHigherEducationfromOtherInstitues?: BoolFilter<"Registration"> | boolean
    highestLevelOfEduction?: EnumLevelofEductionFilter<"Registration"> | $Enums.LevelofEduction
    UniversityofHigherEducdation?: StringNullableFilter<"Registration"> | string | null
    Company?: StringNullableFilter<"Registration"> | string | null
    Title?: StringNullableFilter<"Registration"> | string | null
    Industry?: StringNullableFilter<"Registration"> | string | null
    WorkExp?: IntNullableFilter<"Registration"> | number | null
    PlaceofWork?: StringNullableFilter<"Registration"> | string | null
    Skills?: StringNullableListFilter<"Registration">
    currentAddress?: XOR<AddressCompositeFilter, AddressObjectEqualityInput>
  }, "id" | "email" | "primaryEmailId" | "secondaryEmailId">

  export type RegistrationOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    FirstName?: SortOrder
    LastName?: SortOrder
    primaryEmailId?: SortOrder
    secondaryEmailId?: SortOrder
    Gender?: SortOrder
    DateofBirth?: SortOrder
    startingYear?: SortOrder
    YearofPassing?: SortOrder
    Institution?: SortOrder
    Degree?: SortOrder
    Specialization?: SortOrder
    optedForHigherEducationfromOtherInstitues?: SortOrder
    highestLevelOfEduction?: SortOrder
    UniversityofHigherEducdation?: SortOrder
    Company?: SortOrder
    Title?: SortOrder
    Industry?: SortOrder
    WorkExp?: SortOrder
    PlaceofWork?: SortOrder
    Skills?: SortOrder
    _count?: RegistrationCountOrderByAggregateInput
    _avg?: RegistrationAvgOrderByAggregateInput
    _max?: RegistrationMaxOrderByAggregateInput
    _min?: RegistrationMinOrderByAggregateInput
    _sum?: RegistrationSumOrderByAggregateInput
  }

  export type RegistrationScalarWhereWithAggregatesInput = {
    AND?: RegistrationScalarWhereWithAggregatesInput | RegistrationScalarWhereWithAggregatesInput[]
    OR?: RegistrationScalarWhereWithAggregatesInput[]
    NOT?: RegistrationScalarWhereWithAggregatesInput | RegistrationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Registration"> | string
    email?: StringWithAggregatesFilter<"Registration"> | string
    FirstName?: StringNullableWithAggregatesFilter<"Registration"> | string | null
    LastName?: StringNullableWithAggregatesFilter<"Registration"> | string | null
    primaryEmailId?: StringWithAggregatesFilter<"Registration"> | string
    secondaryEmailId?: StringWithAggregatesFilter<"Registration"> | string
    Gender?: EnumGENDERWithAggregatesFilter<"Registration"> | $Enums.GENDER
    DateofBirth?: DateTimeWithAggregatesFilter<"Registration"> | Date | string
    startingYear?: BigIntWithAggregatesFilter<"Registration"> | bigint | number
    YearofPassing?: BigIntNullableWithAggregatesFilter<"Registration"> | bigint | number | null
    Institution?: EnumInstitutesWithAggregatesFilter<"Registration"> | $Enums.Institutes
    Degree?: EnumDegreeWithAggregatesFilter<"Registration"> | $Enums.Degree
    Specialization?: StringWithAggregatesFilter<"Registration"> | string
    optedForHigherEducationfromOtherInstitues?: BoolWithAggregatesFilter<"Registration"> | boolean
    highestLevelOfEduction?: EnumLevelofEductionWithAggregatesFilter<"Registration"> | $Enums.LevelofEduction
    UniversityofHigherEducdation?: StringNullableWithAggregatesFilter<"Registration"> | string | null
    Company?: StringNullableWithAggregatesFilter<"Registration"> | string | null
    Title?: StringNullableWithAggregatesFilter<"Registration"> | string | null
    Industry?: StringNullableWithAggregatesFilter<"Registration"> | string | null
    WorkExp?: IntNullableWithAggregatesFilter<"Registration"> | number | null
    PlaceofWork?: StringNullableWithAggregatesFilter<"Registration"> | string | null
    Skills?: StringNullableListFilter<"Registration">
  }

  export type RegistrationCreateInput = {
    id?: string
    email: string
    FirstName?: string | null
    LastName?: string | null
    primaryEmailId: string
    secondaryEmailId: string
    Gender: $Enums.GENDER
    DateofBirth: Date | string
    startingYear: bigint | number
    YearofPassing?: bigint | number | null
    Institution: $Enums.Institutes
    Degree: $Enums.Degree
    Specialization: string
    optedForHigherEducationfromOtherInstitues?: boolean
    highestLevelOfEduction: $Enums.LevelofEduction
    UniversityofHigherEducdation?: string | null
    Company?: string | null
    Title?: string | null
    Industry?: string | null
    WorkExp?: number | null
    PlaceofWork?: string | null
    Skills?: RegistrationCreateSkillsInput | string[]
    currentAddress: XOR<AddressCreateEnvelopeInput, AddressCreateInput>
  }

  export type RegistrationUncheckedCreateInput = {
    id?: string
    email: string
    FirstName?: string | null
    LastName?: string | null
    primaryEmailId: string
    secondaryEmailId: string
    Gender: $Enums.GENDER
    DateofBirth: Date | string
    startingYear: bigint | number
    YearofPassing?: bigint | number | null
    Institution: $Enums.Institutes
    Degree: $Enums.Degree
    Specialization: string
    optedForHigherEducationfromOtherInstitues?: boolean
    highestLevelOfEduction: $Enums.LevelofEduction
    UniversityofHigherEducdation?: string | null
    Company?: string | null
    Title?: string | null
    Industry?: string | null
    WorkExp?: number | null
    PlaceofWork?: string | null
    Skills?: RegistrationCreateSkillsInput | string[]
    currentAddress: XOR<AddressCreateEnvelopeInput, AddressCreateInput>
  }

  export type RegistrationUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    FirstName?: NullableStringFieldUpdateOperationsInput | string | null
    LastName?: NullableStringFieldUpdateOperationsInput | string | null
    primaryEmailId?: StringFieldUpdateOperationsInput | string
    secondaryEmailId?: StringFieldUpdateOperationsInput | string
    Gender?: EnumGENDERFieldUpdateOperationsInput | $Enums.GENDER
    DateofBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    startingYear?: BigIntFieldUpdateOperationsInput | bigint | number
    YearofPassing?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    Institution?: EnumInstitutesFieldUpdateOperationsInput | $Enums.Institutes
    Degree?: EnumDegreeFieldUpdateOperationsInput | $Enums.Degree
    Specialization?: StringFieldUpdateOperationsInput | string
    optedForHigherEducationfromOtherInstitues?: BoolFieldUpdateOperationsInput | boolean
    highestLevelOfEduction?: EnumLevelofEductionFieldUpdateOperationsInput | $Enums.LevelofEduction
    UniversityofHigherEducdation?: NullableStringFieldUpdateOperationsInput | string | null
    Company?: NullableStringFieldUpdateOperationsInput | string | null
    Title?: NullableStringFieldUpdateOperationsInput | string | null
    Industry?: NullableStringFieldUpdateOperationsInput | string | null
    WorkExp?: NullableIntFieldUpdateOperationsInput | number | null
    PlaceofWork?: NullableStringFieldUpdateOperationsInput | string | null
    Skills?: RegistrationUpdateSkillsInput | string[]
    currentAddress?: XOR<AddressUpdateEnvelopeInput, AddressCreateInput>
  }

  export type RegistrationUncheckedUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    FirstName?: NullableStringFieldUpdateOperationsInput | string | null
    LastName?: NullableStringFieldUpdateOperationsInput | string | null
    primaryEmailId?: StringFieldUpdateOperationsInput | string
    secondaryEmailId?: StringFieldUpdateOperationsInput | string
    Gender?: EnumGENDERFieldUpdateOperationsInput | $Enums.GENDER
    DateofBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    startingYear?: BigIntFieldUpdateOperationsInput | bigint | number
    YearofPassing?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    Institution?: EnumInstitutesFieldUpdateOperationsInput | $Enums.Institutes
    Degree?: EnumDegreeFieldUpdateOperationsInput | $Enums.Degree
    Specialization?: StringFieldUpdateOperationsInput | string
    optedForHigherEducationfromOtherInstitues?: BoolFieldUpdateOperationsInput | boolean
    highestLevelOfEduction?: EnumLevelofEductionFieldUpdateOperationsInput | $Enums.LevelofEduction
    UniversityofHigherEducdation?: NullableStringFieldUpdateOperationsInput | string | null
    Company?: NullableStringFieldUpdateOperationsInput | string | null
    Title?: NullableStringFieldUpdateOperationsInput | string | null
    Industry?: NullableStringFieldUpdateOperationsInput | string | null
    WorkExp?: NullableIntFieldUpdateOperationsInput | number | null
    PlaceofWork?: NullableStringFieldUpdateOperationsInput | string | null
    Skills?: RegistrationUpdateSkillsInput | string[]
    currentAddress?: XOR<AddressUpdateEnvelopeInput, AddressCreateInput>
  }

  export type RegistrationCreateManyInput = {
    id?: string
    email: string
    FirstName?: string | null
    LastName?: string | null
    primaryEmailId: string
    secondaryEmailId: string
    Gender: $Enums.GENDER
    DateofBirth: Date | string
    startingYear: bigint | number
    YearofPassing?: bigint | number | null
    Institution: $Enums.Institutes
    Degree: $Enums.Degree
    Specialization: string
    optedForHigherEducationfromOtherInstitues?: boolean
    highestLevelOfEduction: $Enums.LevelofEduction
    UniversityofHigherEducdation?: string | null
    Company?: string | null
    Title?: string | null
    Industry?: string | null
    WorkExp?: number | null
    PlaceofWork?: string | null
    Skills?: RegistrationCreateSkillsInput | string[]
    currentAddress: XOR<AddressCreateEnvelopeInput, AddressCreateInput>
  }

  export type RegistrationUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    FirstName?: NullableStringFieldUpdateOperationsInput | string | null
    LastName?: NullableStringFieldUpdateOperationsInput | string | null
    primaryEmailId?: StringFieldUpdateOperationsInput | string
    secondaryEmailId?: StringFieldUpdateOperationsInput | string
    Gender?: EnumGENDERFieldUpdateOperationsInput | $Enums.GENDER
    DateofBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    startingYear?: BigIntFieldUpdateOperationsInput | bigint | number
    YearofPassing?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    Institution?: EnumInstitutesFieldUpdateOperationsInput | $Enums.Institutes
    Degree?: EnumDegreeFieldUpdateOperationsInput | $Enums.Degree
    Specialization?: StringFieldUpdateOperationsInput | string
    optedForHigherEducationfromOtherInstitues?: BoolFieldUpdateOperationsInput | boolean
    highestLevelOfEduction?: EnumLevelofEductionFieldUpdateOperationsInput | $Enums.LevelofEduction
    UniversityofHigherEducdation?: NullableStringFieldUpdateOperationsInput | string | null
    Company?: NullableStringFieldUpdateOperationsInput | string | null
    Title?: NullableStringFieldUpdateOperationsInput | string | null
    Industry?: NullableStringFieldUpdateOperationsInput | string | null
    WorkExp?: NullableIntFieldUpdateOperationsInput | number | null
    PlaceofWork?: NullableStringFieldUpdateOperationsInput | string | null
    Skills?: RegistrationUpdateSkillsInput | string[]
    currentAddress?: XOR<AddressUpdateEnvelopeInput, AddressCreateInput>
  }

  export type RegistrationUncheckedUpdateManyInput = {
    email?: StringFieldUpdateOperationsInput | string
    FirstName?: NullableStringFieldUpdateOperationsInput | string | null
    LastName?: NullableStringFieldUpdateOperationsInput | string | null
    primaryEmailId?: StringFieldUpdateOperationsInput | string
    secondaryEmailId?: StringFieldUpdateOperationsInput | string
    Gender?: EnumGENDERFieldUpdateOperationsInput | $Enums.GENDER
    DateofBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    startingYear?: BigIntFieldUpdateOperationsInput | bigint | number
    YearofPassing?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    Institution?: EnumInstitutesFieldUpdateOperationsInput | $Enums.Institutes
    Degree?: EnumDegreeFieldUpdateOperationsInput | $Enums.Degree
    Specialization?: StringFieldUpdateOperationsInput | string
    optedForHigherEducationfromOtherInstitues?: BoolFieldUpdateOperationsInput | boolean
    highestLevelOfEduction?: EnumLevelofEductionFieldUpdateOperationsInput | $Enums.LevelofEduction
    UniversityofHigherEducdation?: NullableStringFieldUpdateOperationsInput | string | null
    Company?: NullableStringFieldUpdateOperationsInput | string | null
    Title?: NullableStringFieldUpdateOperationsInput | string | null
    Industry?: NullableStringFieldUpdateOperationsInput | string | null
    WorkExp?: NullableIntFieldUpdateOperationsInput | number | null
    PlaceofWork?: NullableStringFieldUpdateOperationsInput | string | null
    Skills?: RegistrationUpdateSkillsInput | string[]
    currentAddress?: XOR<AddressUpdateEnvelopeInput, AddressCreateInput>
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
    isSet?: boolean
  }

  export type EnumGENDERFilter<$PrismaModel = never> = {
    equals?: $Enums.GENDER | EnumGENDERFieldRefInput<$PrismaModel>
    in?: $Enums.GENDER[] | ListEnumGENDERFieldRefInput<$PrismaModel>
    notIn?: $Enums.GENDER[] | ListEnumGENDERFieldRefInput<$PrismaModel>
    not?: NestedEnumGENDERFilter<$PrismaModel> | $Enums.GENDER
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type BigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
    isSet?: boolean
  }

  export type EnumInstitutesFilter<$PrismaModel = never> = {
    equals?: $Enums.Institutes | EnumInstitutesFieldRefInput<$PrismaModel>
    in?: $Enums.Institutes[] | ListEnumInstitutesFieldRefInput<$PrismaModel>
    notIn?: $Enums.Institutes[] | ListEnumInstitutesFieldRefInput<$PrismaModel>
    not?: NestedEnumInstitutesFilter<$PrismaModel> | $Enums.Institutes
  }

  export type EnumDegreeFilter<$PrismaModel = never> = {
    equals?: $Enums.Degree | EnumDegreeFieldRefInput<$PrismaModel>
    in?: $Enums.Degree[] | ListEnumDegreeFieldRefInput<$PrismaModel>
    notIn?: $Enums.Degree[] | ListEnumDegreeFieldRefInput<$PrismaModel>
    not?: NestedEnumDegreeFilter<$PrismaModel> | $Enums.Degree
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type EnumLevelofEductionFilter<$PrismaModel = never> = {
    equals?: $Enums.LevelofEduction | EnumLevelofEductionFieldRefInput<$PrismaModel>
    in?: $Enums.LevelofEduction[] | ListEnumLevelofEductionFieldRefInput<$PrismaModel>
    notIn?: $Enums.LevelofEduction[] | ListEnumLevelofEductionFieldRefInput<$PrismaModel>
    not?: NestedEnumLevelofEductionFilter<$PrismaModel> | $Enums.LevelofEduction
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type AddressCompositeFilter = {
    equals?: AddressObjectEqualityInput
    is?: AddressWhereInput
    isNot?: AddressWhereInput
  }

  export type AddressObjectEqualityInput = {
    placeOfWork: string
    state: string
    city: string
  }

  export type AddressOrderByInput = {
    placeOfWork?: SortOrder
    state?: SortOrder
    city?: SortOrder
  }

  export type RegistrationCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    FirstName?: SortOrder
    LastName?: SortOrder
    primaryEmailId?: SortOrder
    secondaryEmailId?: SortOrder
    Gender?: SortOrder
    DateofBirth?: SortOrder
    startingYear?: SortOrder
    YearofPassing?: SortOrder
    Institution?: SortOrder
    Degree?: SortOrder
    Specialization?: SortOrder
    optedForHigherEducationfromOtherInstitues?: SortOrder
    highestLevelOfEduction?: SortOrder
    UniversityofHigherEducdation?: SortOrder
    Company?: SortOrder
    Title?: SortOrder
    Industry?: SortOrder
    WorkExp?: SortOrder
    PlaceofWork?: SortOrder
    Skills?: SortOrder
  }

  export type RegistrationAvgOrderByAggregateInput = {
    startingYear?: SortOrder
    YearofPassing?: SortOrder
    WorkExp?: SortOrder
  }

  export type RegistrationMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    FirstName?: SortOrder
    LastName?: SortOrder
    primaryEmailId?: SortOrder
    secondaryEmailId?: SortOrder
    Gender?: SortOrder
    DateofBirth?: SortOrder
    startingYear?: SortOrder
    YearofPassing?: SortOrder
    Institution?: SortOrder
    Degree?: SortOrder
    Specialization?: SortOrder
    optedForHigherEducationfromOtherInstitues?: SortOrder
    highestLevelOfEduction?: SortOrder
    UniversityofHigherEducdation?: SortOrder
    Company?: SortOrder
    Title?: SortOrder
    Industry?: SortOrder
    WorkExp?: SortOrder
    PlaceofWork?: SortOrder
  }

  export type RegistrationMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    FirstName?: SortOrder
    LastName?: SortOrder
    primaryEmailId?: SortOrder
    secondaryEmailId?: SortOrder
    Gender?: SortOrder
    DateofBirth?: SortOrder
    startingYear?: SortOrder
    YearofPassing?: SortOrder
    Institution?: SortOrder
    Degree?: SortOrder
    Specialization?: SortOrder
    optedForHigherEducationfromOtherInstitues?: SortOrder
    highestLevelOfEduction?: SortOrder
    UniversityofHigherEducdation?: SortOrder
    Company?: SortOrder
    Title?: SortOrder
    Industry?: SortOrder
    WorkExp?: SortOrder
    PlaceofWork?: SortOrder
  }

  export type RegistrationSumOrderByAggregateInput = {
    startingYear?: SortOrder
    YearofPassing?: SortOrder
    WorkExp?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type EnumGENDERWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.GENDER | EnumGENDERFieldRefInput<$PrismaModel>
    in?: $Enums.GENDER[] | ListEnumGENDERFieldRefInput<$PrismaModel>
    notIn?: $Enums.GENDER[] | ListEnumGENDERFieldRefInput<$PrismaModel>
    not?: NestedEnumGENDERWithAggregatesFilter<$PrismaModel> | $Enums.GENDER
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGENDERFilter<$PrismaModel>
    _max?: NestedEnumGENDERFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type BigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type EnumInstitutesWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Institutes | EnumInstitutesFieldRefInput<$PrismaModel>
    in?: $Enums.Institutes[] | ListEnumInstitutesFieldRefInput<$PrismaModel>
    notIn?: $Enums.Institutes[] | ListEnumInstitutesFieldRefInput<$PrismaModel>
    not?: NestedEnumInstitutesWithAggregatesFilter<$PrismaModel> | $Enums.Institutes
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumInstitutesFilter<$PrismaModel>
    _max?: NestedEnumInstitutesFilter<$PrismaModel>
  }

  export type EnumDegreeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Degree | EnumDegreeFieldRefInput<$PrismaModel>
    in?: $Enums.Degree[] | ListEnumDegreeFieldRefInput<$PrismaModel>
    notIn?: $Enums.Degree[] | ListEnumDegreeFieldRefInput<$PrismaModel>
    not?: NestedEnumDegreeWithAggregatesFilter<$PrismaModel> | $Enums.Degree
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDegreeFilter<$PrismaModel>
    _max?: NestedEnumDegreeFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumLevelofEductionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LevelofEduction | EnumLevelofEductionFieldRefInput<$PrismaModel>
    in?: $Enums.LevelofEduction[] | ListEnumLevelofEductionFieldRefInput<$PrismaModel>
    notIn?: $Enums.LevelofEduction[] | ListEnumLevelofEductionFieldRefInput<$PrismaModel>
    not?: NestedEnumLevelofEductionWithAggregatesFilter<$PrismaModel> | $Enums.LevelofEduction
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLevelofEductionFilter<$PrismaModel>
    _max?: NestedEnumLevelofEductionFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type RegistrationCreateSkillsInput = {
    set: string[]
  }

  export type AddressCreateEnvelopeInput = {
    set?: AddressCreateInput
  }

  export type AddressCreateInput = {
    placeOfWork: string
    state: string
    city: string
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
    unset?: boolean
  }

  export type EnumGENDERFieldUpdateOperationsInput = {
    set?: $Enums.GENDER
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type NullableBigIntFieldUpdateOperationsInput = {
    set?: bigint | number | null
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
    unset?: boolean
  }

  export type EnumInstitutesFieldUpdateOperationsInput = {
    set?: $Enums.Institutes
  }

  export type EnumDegreeFieldUpdateOperationsInput = {
    set?: $Enums.Degree
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type EnumLevelofEductionFieldUpdateOperationsInput = {
    set?: $Enums.LevelofEduction
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
    unset?: boolean
  }

  export type RegistrationUpdateSkillsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type AddressUpdateEnvelopeInput = {
    set?: AddressCreateInput
    update?: AddressUpdateInput
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
    isSet?: boolean
  }

  export type NestedEnumGENDERFilter<$PrismaModel = never> = {
    equals?: $Enums.GENDER | EnumGENDERFieldRefInput<$PrismaModel>
    in?: $Enums.GENDER[] | ListEnumGENDERFieldRefInput<$PrismaModel>
    notIn?: $Enums.GENDER[] | ListEnumGENDERFieldRefInput<$PrismaModel>
    not?: NestedEnumGENDERFilter<$PrismaModel> | $Enums.GENDER
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type NestedBigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
    isSet?: boolean
  }

  export type NestedEnumInstitutesFilter<$PrismaModel = never> = {
    equals?: $Enums.Institutes | EnumInstitutesFieldRefInput<$PrismaModel>
    in?: $Enums.Institutes[] | ListEnumInstitutesFieldRefInput<$PrismaModel>
    notIn?: $Enums.Institutes[] | ListEnumInstitutesFieldRefInput<$PrismaModel>
    not?: NestedEnumInstitutesFilter<$PrismaModel> | $Enums.Institutes
  }

  export type NestedEnumDegreeFilter<$PrismaModel = never> = {
    equals?: $Enums.Degree | EnumDegreeFieldRefInput<$PrismaModel>
    in?: $Enums.Degree[] | ListEnumDegreeFieldRefInput<$PrismaModel>
    notIn?: $Enums.Degree[] | ListEnumDegreeFieldRefInput<$PrismaModel>
    not?: NestedEnumDegreeFilter<$PrismaModel> | $Enums.Degree
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumLevelofEductionFilter<$PrismaModel = never> = {
    equals?: $Enums.LevelofEduction | EnumLevelofEductionFieldRefInput<$PrismaModel>
    in?: $Enums.LevelofEduction[] | ListEnumLevelofEductionFieldRefInput<$PrismaModel>
    notIn?: $Enums.LevelofEduction[] | ListEnumLevelofEductionFieldRefInput<$PrismaModel>
    not?: NestedEnumLevelofEductionFilter<$PrismaModel> | $Enums.LevelofEduction
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
  }

  export type AddressWhereInput = {
    AND?: AddressWhereInput | AddressWhereInput[]
    OR?: AddressWhereInput[]
    NOT?: AddressWhereInput | AddressWhereInput[]
    placeOfWork?: StringFilter<"Address"> | string
    state?: StringFilter<"Address"> | string
    city?: StringFilter<"Address"> | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type NestedEnumGENDERWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.GENDER | EnumGENDERFieldRefInput<$PrismaModel>
    in?: $Enums.GENDER[] | ListEnumGENDERFieldRefInput<$PrismaModel>
    notIn?: $Enums.GENDER[] | ListEnumGENDERFieldRefInput<$PrismaModel>
    not?: NestedEnumGENDERWithAggregatesFilter<$PrismaModel> | $Enums.GENDER
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGENDERFilter<$PrismaModel>
    _max?: NestedEnumGENDERFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
  }

  export type NestedEnumInstitutesWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Institutes | EnumInstitutesFieldRefInput<$PrismaModel>
    in?: $Enums.Institutes[] | ListEnumInstitutesFieldRefInput<$PrismaModel>
    notIn?: $Enums.Institutes[] | ListEnumInstitutesFieldRefInput<$PrismaModel>
    not?: NestedEnumInstitutesWithAggregatesFilter<$PrismaModel> | $Enums.Institutes
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumInstitutesFilter<$PrismaModel>
    _max?: NestedEnumInstitutesFilter<$PrismaModel>
  }

  export type NestedEnumDegreeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Degree | EnumDegreeFieldRefInput<$PrismaModel>
    in?: $Enums.Degree[] | ListEnumDegreeFieldRefInput<$PrismaModel>
    notIn?: $Enums.Degree[] | ListEnumDegreeFieldRefInput<$PrismaModel>
    not?: NestedEnumDegreeWithAggregatesFilter<$PrismaModel> | $Enums.Degree
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDegreeFilter<$PrismaModel>
    _max?: NestedEnumDegreeFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumLevelofEductionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LevelofEduction | EnumLevelofEductionFieldRefInput<$PrismaModel>
    in?: $Enums.LevelofEduction[] | ListEnumLevelofEductionFieldRefInput<$PrismaModel>
    notIn?: $Enums.LevelofEduction[] | ListEnumLevelofEductionFieldRefInput<$PrismaModel>
    not?: NestedEnumLevelofEductionWithAggregatesFilter<$PrismaModel> | $Enums.LevelofEduction
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLevelofEductionFilter<$PrismaModel>
    _max?: NestedEnumLevelofEductionFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type AddressUpdateInput = {
    placeOfWork?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}