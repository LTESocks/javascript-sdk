/** This file is generated from openapi/openapi.yaml. Do not edit manually. */

import type { FileDownload } from "../files.js";
import type {
  ApiResponse,
  OperationBody,
  OperationParameter,
  OperationResult,
  RequestControls,
  ResourceClient,
} from "../internal.js";
import type { operations } from "./schema.js";

export interface UserGetOptions {
  request?: RequestControls;
}

export type UserGetResponse = OperationResult<operations["getUser"]>;

export interface UserUpdatePreferencesOptions {
  idempotencyKey?: OperationParameter<
    operations["updateUserPreferences"],
    "header",
    "Idempotency-Key"
  >;
  body: OperationBody<operations["updateUserPreferences"]>;
  request?: RequestControls;
}

export type UserUpdatePreferencesResponse = OperationResult<operations["updateUserPreferences"]>;

export class UserResource {
  readonly #client: ResourceClient;

  constructor(client: ResourceClient) {
    this.#client = client;
  }

  /** Get the current user */
  async get(options: UserGetOptions = {}): Promise<UserGetResponse> {
    return (await this.getWithResponse(options)).data;
  }

  /** Get the current user; include response metadata. */
  async getWithResponse(options: UserGetOptions = {}): Promise<ApiResponse<UserGetResponse>> {
    return this.#client._callWithResponse<UserGetResponse>(
      {
        operationId: "getUser",
        method: "GET",
        path: "/user",
      },
      {
        ...(options.request === undefined ? {} : { request: options.request }),
      },
    );
  }

  /** Update user preferences */
  async updatePreferences(
    options: UserUpdatePreferencesOptions,
  ): Promise<UserUpdatePreferencesResponse> {
    return (await this.updatePreferencesWithResponse(options)).data;
  }

  /** Update user preferences; include response metadata. */
  async updatePreferencesWithResponse(
    options: UserUpdatePreferencesOptions,
  ): Promise<ApiResponse<UserUpdatePreferencesResponse>> {
    return this.#client._callWithResponse<UserUpdatePreferencesResponse>(
      {
        operationId: "updateUserPreferences",
        method: "POST",
        path: "/user/preferences",
        idempotent: true,
      },
      {
        headers: {
          "Idempotency-Key": options.idempotencyKey,
        },
        body: options.body,
        ...(options.request === undefined ? {} : { request: options.request }),
      },
    );
  }
}

export interface PortsListOptions {
  request?: RequestControls;
}

export type PortsListResponse = OperationResult<operations["listPorts"]>;

export interface PortsFilterOptions {
  body: OperationBody<operations["filterPorts"]>;
  request?: RequestControls;
}

export type PortsFilterResponse = OperationResult<operations["filterPorts"]>;

export interface PortsGetOptions {
  id: OperationParameter<operations["getPort"], "path", "id">;
  request?: RequestControls;
}

export type PortsGetResponse = OperationResult<operations["getPort"]>;

export interface PortsDeleteOptions {
  id: OperationParameter<operations["deletePort"], "path", "id">;
  request?: RequestControls;
}

export type PortsDeleteResponse = OperationResult<operations["deletePort"]>;

export interface PortsDeleteCompatOptions {
  id: OperationParameter<operations["deletePortWithPost"], "path", "id">;
  request?: RequestControls;
}

export type PortsDeleteCompatResponse = OperationResult<operations["deletePortWithPost"]>;

export interface PortsGetLogOptions {
  id: OperationParameter<operations["getPortLog"], "path", "id">;
  request?: RequestControls;
}

export type PortsGetLogResponse = OperationResult<operations["getPortLog"]>;

export interface PortsFilterLogOptions {
  id: OperationParameter<operations["filterPortLog"], "path", "id">;
  body: OperationBody<operations["filterPortLog"]>;
  request?: RequestControls;
}

export type PortsFilterLogResponse = OperationResult<operations["filterPortLog"]>;

export interface PortsDownloadVpnOptions {
  id: OperationParameter<operations["getPortVpn"], "path", "id">;
  request?: RequestControls;
}

export type PortsDownloadVpnResponse = FileDownload;

export interface PortsDownloadVpnCompatOptions {
  id: OperationParameter<operations["downloadPortVpnWithPost"], "path", "id">;
  request?: RequestControls;
}

export type PortsDownloadVpnCompatResponse = FileDownload;

export interface PortsOrderOptions {
  idempotencyKey?: OperationParameter<operations["orderPorts"], "header", "Idempotency-Key">;
  body: OperationBody<operations["orderPorts"]>;
  request?: RequestControls;
}

export type PortsOrderResponse = OperationResult<operations["orderPorts"]>;

export interface PortsExtendOptions {
  id: OperationParameter<operations["extendPort"], "path", "id">;
  idempotencyKey?: OperationParameter<operations["extendPort"], "header", "Idempotency-Key">;
  request?: RequestControls;
}

export type PortsExtendResponse = OperationResult<operations["extendPort"]>;

export interface PortsChangePlanOptions {
  id: OperationParameter<operations["changePortPlan"], "path", "id">;
  idempotencyKey?: OperationParameter<operations["changePortPlan"], "header", "Idempotency-Key">;
  body: OperationBody<operations["changePortPlan"]>;
  request?: RequestControls;
}

export type PortsChangePlanResponse = OperationResult<operations["changePortPlan"]>;

export interface PortsUpdateTagsOptions {
  id: OperationParameter<operations["updatePortTags"], "path", "id">;
  idempotencyKey?: OperationParameter<operations["updatePortTags"], "header", "Idempotency-Key">;
  body: OperationBody<operations["updatePortTags"]>;
  request?: RequestControls;
}

export type PortsUpdateTagsResponse = OperationResult<operations["updatePortTags"]>;

export interface PortsSetAutoRenewOptions {
  id: OperationParameter<operations["updatePortAutorenew"], "path", "id">;
  idempotencyKey?: OperationParameter<
    operations["updatePortAutorenew"],
    "header",
    "Idempotency-Key"
  >;
  body: OperationBody<operations["updatePortAutorenew"]>;
  request?: RequestControls;
}

export type PortsSetAutoRenewResponse = OperationResult<operations["updatePortAutorenew"]>;

export interface PortsUpdateSignatureOptions {
  id: OperationParameter<operations["updatePortSignature"], "path", "id">;
  idempotencyKey?: OperationParameter<
    operations["updatePortSignature"],
    "header",
    "Idempotency-Key"
  >;
  body: OperationBody<operations["updatePortSignature"]>;
  request?: RequestControls;
}

export type PortsUpdateSignatureResponse = OperationResult<operations["updatePortSignature"]>;

export interface PortsUpdateCredentialsOptions {
  id: OperationParameter<operations["updatePortCredentials"], "path", "id">;
  idempotencyKey?: OperationParameter<
    operations["updatePortCredentials"],
    "header",
    "Idempotency-Key"
  >;
  body: OperationBody<operations["updatePortCredentials"]>;
  request?: RequestControls;
}

export type PortsUpdateCredentialsResponse = OperationResult<operations["updatePortCredentials"]>;

export interface PortsSetAutoResetIntervalOptions {
  id: OperationParameter<operations["updatePortAutoreset"], "path", "id">;
  idempotencyKey?: OperationParameter<
    operations["updatePortAutoreset"],
    "header",
    "Idempotency-Key"
  >;
  body: OperationBody<operations["updatePortAutoreset"]>;
  request?: RequestControls;
}

export type PortsSetAutoResetIntervalResponse = OperationResult<operations["updatePortAutoreset"]>;

export interface PortsResetOptions {
  id: OperationParameter<operations["resetPort"], "path", "id">;
  idempotencyKey?: OperationParameter<operations["resetPort"], "header", "Idempotency-Key">;
  request?: RequestControls;
}

export type PortsResetResponse = OperationResult<operations["resetPort"]>;

export interface PortsResolveResetTokenOptions {
  token: OperationParameter<operations["resolveResetToken"], "path", "token">;
  request?: RequestControls;
}

export type PortsResolveResetTokenResponse = OperationResult<operations["resolveResetToken"]>;

export class PortsResource {
  readonly #client: ResourceClient;

  constructor(client: ResourceClient) {
    this.#client = client;
  }

  /** List ports */
  async list(options: PortsListOptions = {}): Promise<PortsListResponse> {
    return (await this.listWithResponse(options)).data;
  }

  /** List ports; include response metadata. */
  async listWithResponse(options: PortsListOptions = {}): Promise<ApiResponse<PortsListResponse>> {
    return this.#client._callWithResponse<PortsListResponse>(
      {
        operationId: "listPorts",
        method: "GET",
        path: "/ports",
      },
      {
        ...(options.request === undefined ? {} : { request: options.request }),
      },
    );
  }

  /** Filter ports */
  async filter(options: PortsFilterOptions): Promise<PortsFilterResponse> {
    return (await this.filterWithResponse(options)).data;
  }

  /** Filter ports; include response metadata. */
  async filterWithResponse(options: PortsFilterOptions): Promise<ApiResponse<PortsFilterResponse>> {
    return this.#client._callWithResponse<PortsFilterResponse>(
      {
        operationId: "filterPorts",
        method: "POST",
        path: "/ports",
      },
      {
        body: options.body,
        ...(options.request === undefined ? {} : { request: options.request }),
      },
    );
  }

  /** Get a port */
  async get(options: PortsGetOptions): Promise<PortsGetResponse> {
    return (await this.getWithResponse(options)).data;
  }

  /** Get a port; include response metadata. */
  async getWithResponse(options: PortsGetOptions): Promise<ApiResponse<PortsGetResponse>> {
    return this.#client._callWithResponse<PortsGetResponse>(
      {
        operationId: "getPort",
        method: "GET",
        path: "/ports/{id}",
      },
      {
        path: {
          id: options.id,
        },
        ...(options.request === undefined ? {} : { request: options.request }),
      },
    );
  }

  /** Delete a port */
  async delete(options: PortsDeleteOptions): Promise<PortsDeleteResponse> {
    return (await this.deleteWithResponse(options)).data;
  }

  /** Delete a port; include response metadata. */
  async deleteWithResponse(options: PortsDeleteOptions): Promise<ApiResponse<PortsDeleteResponse>> {
    return this.#client._callWithResponse<PortsDeleteResponse>(
      {
        operationId: "deletePort",
        method: "DELETE",
        path: "/ports/{id}",
      },
      {
        path: {
          id: options.id,
        },
        ...(options.request === undefined ? {} : { request: options.request }),
      },
    );
  }

  /** Delete a port with POST */
  async deleteCompat(options: PortsDeleteCompatOptions): Promise<PortsDeleteCompatResponse> {
    return (await this.deleteCompatWithResponse(options)).data;
  }

  /** Delete a port with POST; include response metadata. */
  async deleteCompatWithResponse(
    options: PortsDeleteCompatOptions,
  ): Promise<ApiResponse<PortsDeleteCompatResponse>> {
    return this.#client._callWithResponse<PortsDeleteCompatResponse>(
      {
        operationId: "deletePortWithPost",
        method: "POST",
        path: "/ports/{id}/delete",
      },
      {
        path: {
          id: options.id,
        },
        ...(options.request === undefined ? {} : { request: options.request }),
      },
    );
  }

  /** Get recent port log */
  async getLog(options: PortsGetLogOptions): Promise<PortsGetLogResponse> {
    return (await this.getLogWithResponse(options)).data;
  }

  /** Get recent port log; include response metadata. */
  async getLogWithResponse(options: PortsGetLogOptions): Promise<ApiResponse<PortsGetLogResponse>> {
    return this.#client._callWithResponse<PortsGetLogResponse>(
      {
        operationId: "getPortLog",
        method: "GET",
        path: "/ports/{id}/log",
      },
      {
        path: {
          id: options.id,
        },
        ...(options.request === undefined ? {} : { request: options.request }),
      },
    );
  }

  /** Filter port log */
  async filterLog(options: PortsFilterLogOptions): Promise<PortsFilterLogResponse> {
    return (await this.filterLogWithResponse(options)).data;
  }

  /** Filter port log; include response metadata. */
  async filterLogWithResponse(
    options: PortsFilterLogOptions,
  ): Promise<ApiResponse<PortsFilterLogResponse>> {
    return this.#client._callWithResponse<PortsFilterLogResponse>(
      {
        operationId: "filterPortLog",
        method: "POST",
        path: "/ports/{id}/log",
      },
      {
        path: {
          id: options.id,
        },
        body: options.body,
        ...(options.request === undefined ? {} : { request: options.request }),
      },
    );
  }

  /** Download VPN configuration */
  async downloadVpn(options: PortsDownloadVpnOptions): Promise<PortsDownloadVpnResponse> {
    return (await this.downloadVpnWithResponse(options)).data;
  }

  /** Download VPN configuration; include response metadata. */
  async downloadVpnWithResponse(
    options: PortsDownloadVpnOptions,
  ): Promise<ApiResponse<PortsDownloadVpnResponse>> {
    return this.#client._callWithResponse<PortsDownloadVpnResponse>(
      {
        operationId: "getPortVpn",
        method: "GET",
        path: "/ports/{id}/vpn",
        binary: true,
      },
      {
        path: {
          id: options.id,
        },
        ...(options.request === undefined ? {} : { request: options.request }),
      },
    );
  }

  /** Download VPN configuration with POST */
  async downloadVpnCompat(
    options: PortsDownloadVpnCompatOptions,
  ): Promise<PortsDownloadVpnCompatResponse> {
    return (await this.downloadVpnCompatWithResponse(options)).data;
  }

  /** Download VPN configuration with POST; include response metadata. */
  async downloadVpnCompatWithResponse(
    options: PortsDownloadVpnCompatOptions,
  ): Promise<ApiResponse<PortsDownloadVpnCompatResponse>> {
    return this.#client._callWithResponse<PortsDownloadVpnCompatResponse>(
      {
        operationId: "downloadPortVpnWithPost",
        method: "POST",
        path: "/ports/{id}/vpn",
        binary: true,
      },
      {
        path: {
          id: options.id,
        },
        ...(options.request === undefined ? {} : { request: options.request }),
      },
    );
  }

  /** Order a mobile port */
  async order(options: PortsOrderOptions): Promise<PortsOrderResponse> {
    return (await this.orderWithResponse(options)).data;
  }

  /** Order a mobile port; include response metadata. */
  async orderWithResponse(options: PortsOrderOptions): Promise<ApiResponse<PortsOrderResponse>> {
    return this.#client._callWithResponse<PortsOrderResponse>(
      {
        operationId: "orderPorts",
        method: "POST",
        path: "/ports/order",
        idempotent: true,
      },
      {
        headers: {
          "Idempotency-Key": options.idempotencyKey,
        },
        body: options.body,
        ...(options.request === undefined ? {} : { request: options.request }),
      },
    );
  }

  /** Extend a port */
  async extend(options: PortsExtendOptions): Promise<PortsExtendResponse> {
    return (await this.extendWithResponse(options)).data;
  }

  /** Extend a port; include response metadata. */
  async extendWithResponse(options: PortsExtendOptions): Promise<ApiResponse<PortsExtendResponse>> {
    return this.#client._callWithResponse<PortsExtendResponse>(
      {
        operationId: "extendPort",
        method: "POST",
        path: "/ports/{id}/extend",
        idempotent: true,
      },
      {
        path: {
          id: options.id,
        },
        headers: {
          "Idempotency-Key": options.idempotencyKey,
        },
        ...(options.request === undefined ? {} : { request: options.request }),
      },
    );
  }

  /** Change port plan */
  async changePlan(options: PortsChangePlanOptions): Promise<PortsChangePlanResponse> {
    return (await this.changePlanWithResponse(options)).data;
  }

  /** Change port plan; include response metadata. */
  async changePlanWithResponse(
    options: PortsChangePlanOptions,
  ): Promise<ApiResponse<PortsChangePlanResponse>> {
    return this.#client._callWithResponse<PortsChangePlanResponse>(
      {
        operationId: "changePortPlan",
        method: "POST",
        path: "/ports/{id}/plan",
        idempotent: true,
      },
      {
        path: {
          id: options.id,
        },
        headers: {
          "Idempotency-Key": options.idempotencyKey,
        },
        body: options.body,
        ...(options.request === undefined ? {} : { request: options.request }),
      },
    );
  }

  /** Update port tags */
  async updateTags(options: PortsUpdateTagsOptions): Promise<PortsUpdateTagsResponse> {
    return (await this.updateTagsWithResponse(options)).data;
  }

  /** Update port tags; include response metadata. */
  async updateTagsWithResponse(
    options: PortsUpdateTagsOptions,
  ): Promise<ApiResponse<PortsUpdateTagsResponse>> {
    return this.#client._callWithResponse<PortsUpdateTagsResponse>(
      {
        operationId: "updatePortTags",
        method: "POST",
        path: "/ports/{id}/tags",
        idempotent: true,
      },
      {
        path: {
          id: options.id,
        },
        headers: {
          "Idempotency-Key": options.idempotencyKey,
        },
        body: options.body,
        ...(options.request === undefined ? {} : { request: options.request }),
      },
    );
  }

  /** Configure automatic renewal */
  async setAutoRenew(options: PortsSetAutoRenewOptions): Promise<PortsSetAutoRenewResponse> {
    return (await this.setAutoRenewWithResponse(options)).data;
  }

  /** Configure automatic renewal; include response metadata. */
  async setAutoRenewWithResponse(
    options: PortsSetAutoRenewOptions,
  ): Promise<ApiResponse<PortsSetAutoRenewResponse>> {
    return this.#client._callWithResponse<PortsSetAutoRenewResponse>(
      {
        operationId: "updatePortAutorenew",
        method: "POST",
        path: "/ports/{id}/autorenew",
        idempotent: true,
      },
      {
        path: {
          id: options.id,
        },
        headers: {
          "Idempotency-Key": options.idempotencyKey,
        },
        body: options.body,
        ...(options.request === undefined ? {} : { request: options.request }),
      },
    );
  }

  /** Change port signature */
  async updateSignature(
    options: PortsUpdateSignatureOptions,
  ): Promise<PortsUpdateSignatureResponse> {
    return (await this.updateSignatureWithResponse(options)).data;
  }

  /** Change port signature; include response metadata. */
  async updateSignatureWithResponse(
    options: PortsUpdateSignatureOptions,
  ): Promise<ApiResponse<PortsUpdateSignatureResponse>> {
    return this.#client._callWithResponse<PortsUpdateSignatureResponse>(
      {
        operationId: "updatePortSignature",
        method: "POST",
        path: "/ports/{id}/signature",
        idempotent: true,
      },
      {
        path: {
          id: options.id,
        },
        headers: {
          "Idempotency-Key": options.idempotencyKey,
        },
        body: options.body,
        ...(options.request === undefined ? {} : { request: options.request }),
      },
    );
  }

  /** Update proxy credentials */
  async updateCredentials(
    options: PortsUpdateCredentialsOptions,
  ): Promise<PortsUpdateCredentialsResponse> {
    return (await this.updateCredentialsWithResponse(options)).data;
  }

  /** Update proxy credentials; include response metadata. */
  async updateCredentialsWithResponse(
    options: PortsUpdateCredentialsOptions,
  ): Promise<ApiResponse<PortsUpdateCredentialsResponse>> {
    return this.#client._callWithResponse<PortsUpdateCredentialsResponse>(
      {
        operationId: "updatePortCredentials",
        method: "POST",
        path: "/ports/{id}/credentials",
        idempotent: true,
      },
      {
        path: {
          id: options.id,
        },
        headers: {
          "Idempotency-Key": options.idempotencyKey,
        },
        body: options.body,
        ...(options.request === undefined ? {} : { request: options.request }),
      },
    );
  }

  /** Configure automatic reset */
  async setAutoResetInterval(
    options: PortsSetAutoResetIntervalOptions,
  ): Promise<PortsSetAutoResetIntervalResponse> {
    return (await this.setAutoResetIntervalWithResponse(options)).data;
  }

  /** Configure automatic reset; include response metadata. */
  async setAutoResetIntervalWithResponse(
    options: PortsSetAutoResetIntervalOptions,
  ): Promise<ApiResponse<PortsSetAutoResetIntervalResponse>> {
    return this.#client._callWithResponse<PortsSetAutoResetIntervalResponse>(
      {
        operationId: "updatePortAutoreset",
        method: "POST",
        path: "/ports/{id}/autoreset",
        idempotent: true,
      },
      {
        path: {
          id: options.id,
        },
        headers: {
          "Idempotency-Key": options.idempotencyKey,
        },
        body: options.body,
        ...(options.request === undefined ? {} : { request: options.request }),
      },
    );
  }

  /** Reset a port */
  async reset(options: PortsResetOptions): Promise<PortsResetResponse> {
    return (await this.resetWithResponse(options)).data;
  }

  /** Reset a port; include response metadata. */
  async resetWithResponse(options: PortsResetOptions): Promise<ApiResponse<PortsResetResponse>> {
    return this.#client._callWithResponse<PortsResetResponse>(
      {
        operationId: "resetPort",
        method: "POST",
        path: "/ports/{id}/reset",
        idempotent: true,
      },
      {
        path: {
          id: options.id,
        },
        headers: {
          "Idempotency-Key": options.idempotencyKey,
        },
        ...(options.request === undefined ? {} : { request: options.request }),
      },
    );
  }

  /** Resolve a port reset token */
  async resolveResetToken(
    options: PortsResolveResetTokenOptions,
  ): Promise<PortsResolveResetTokenResponse> {
    return (await this.resolveResetTokenWithResponse(options)).data;
  }

  /** Resolve a port reset token; include response metadata. */
  async resolveResetTokenWithResponse(
    options: PortsResolveResetTokenOptions,
  ): Promise<ApiResponse<PortsResolveResetTokenResponse>> {
    return this.#client._callWithResponse<PortsResolveResetTokenResponse>(
      {
        operationId: "resolveResetToken",
        method: "GET",
        path: "/tokens/{token}",
      },
      {
        path: {
          token: options.token,
        },
        ...(options.request === undefined ? {} : { request: options.request }),
      },
    );
  }
}

export interface PaymentsListOptions {
  request?: RequestControls;
}

export type PaymentsListResponse = OperationResult<operations["listPayments"]>;

export interface PaymentsFilterOptions {
  body: OperationBody<operations["filterPayments"]>;
  request?: RequestControls;
}

export type PaymentsFilterResponse = OperationResult<operations["filterPayments"]>;

export interface PaymentsListCurrenciesOptions {
  request?: RequestControls;
}

export type PaymentsListCurrenciesResponse = OperationResult<operations["listPaymentCurrencies"]>;

export interface PaymentsRequestOptions {
  body: OperationBody<operations["requestPayment"]>;
  request?: RequestControls;
}

export type PaymentsRequestResponse = OperationResult<operations["requestPayment"]>;

export class PaymentsResource {
  readonly #client: ResourceClient;

  constructor(client: ResourceClient) {
    this.#client = client;
  }

  /** List payments */
  async list(options: PaymentsListOptions = {}): Promise<PaymentsListResponse> {
    return (await this.listWithResponse(options)).data;
  }

  /** List payments; include response metadata. */
  async listWithResponse(
    options: PaymentsListOptions = {},
  ): Promise<ApiResponse<PaymentsListResponse>> {
    return this.#client._callWithResponse<PaymentsListResponse>(
      {
        operationId: "listPayments",
        method: "GET",
        path: "/payments",
      },
      {
        ...(options.request === undefined ? {} : { request: options.request }),
      },
    );
  }

  /** Filter payments */
  async filter(options: PaymentsFilterOptions): Promise<PaymentsFilterResponse> {
    return (await this.filterWithResponse(options)).data;
  }

  /** Filter payments; include response metadata. */
  async filterWithResponse(
    options: PaymentsFilterOptions,
  ): Promise<ApiResponse<PaymentsFilterResponse>> {
    return this.#client._callWithResponse<PaymentsFilterResponse>(
      {
        operationId: "filterPayments",
        method: "POST",
        path: "/payments",
      },
      {
        body: options.body,
        ...(options.request === undefined ? {} : { request: options.request }),
      },
    );
  }

  /** List payment currencies */
  async listCurrencies(
    options: PaymentsListCurrenciesOptions = {},
  ): Promise<PaymentsListCurrenciesResponse> {
    return (await this.listCurrenciesWithResponse(options)).data;
  }

  /** List payment currencies; include response metadata. */
  async listCurrenciesWithResponse(
    options: PaymentsListCurrenciesOptions = {},
  ): Promise<ApiResponse<PaymentsListCurrenciesResponse>> {
    return this.#client._callWithResponse<PaymentsListCurrenciesResponse>(
      {
        operationId: "listPaymentCurrencies",
        method: "GET",
        path: "/payments/currencies",
      },
      {
        ...(options.request === undefined ? {} : { request: options.request }),
      },
    );
  }

  /** Create a payment request */
  async request(options: PaymentsRequestOptions): Promise<PaymentsRequestResponse> {
    return (await this.requestWithResponse(options)).data;
  }

  /** Create a payment request; include response metadata. */
  async requestWithResponse(
    options: PaymentsRequestOptions,
  ): Promise<ApiResponse<PaymentsRequestResponse>> {
    return this.#client._callWithResponse<PaymentsRequestResponse>(
      {
        operationId: "requestPayment",
        method: "POST",
        path: "/payments/request",
      },
      {
        body: options.body,
        ...(options.request === undefined ? {} : { request: options.request }),
      },
    );
  }
}

export interface GeneralListPlansOptions {
  request?: RequestControls;
}

export type GeneralListPlansResponse = OperationResult<operations["listPlans"]>;

export interface GeneralListServersOptions {
  request?: RequestControls;
}

export type GeneralListServersResponse = OperationResult<operations["listServers"]>;

export interface GeneralListSignaturesOptions {
  request?: RequestControls;
}

export type GeneralListSignaturesResponse = OperationResult<operations["listSignatures"]>;

export class GeneralResource {
  readonly #client: ResourceClient;

  constructor(client: ResourceClient) {
    this.#client = client;
  }

  /** List plans */
  async listPlans(options: GeneralListPlansOptions = {}): Promise<GeneralListPlansResponse> {
    return (await this.listPlansWithResponse(options)).data;
  }

  /** List plans; include response metadata. */
  async listPlansWithResponse(
    options: GeneralListPlansOptions = {},
  ): Promise<ApiResponse<GeneralListPlansResponse>> {
    return this.#client._callWithResponse<GeneralListPlansResponse>(
      {
        operationId: "listPlans",
        method: "GET",
        path: "/plans",
      },
      {
        ...(options.request === undefined ? {} : { request: options.request }),
      },
    );
  }

  /** List servers */
  async listServers(options: GeneralListServersOptions = {}): Promise<GeneralListServersResponse> {
    return (await this.listServersWithResponse(options)).data;
  }

  /** List servers; include response metadata. */
  async listServersWithResponse(
    options: GeneralListServersOptions = {},
  ): Promise<ApiResponse<GeneralListServersResponse>> {
    return this.#client._callWithResponse<GeneralListServersResponse>(
      {
        operationId: "listServers",
        method: "GET",
        path: "/servers",
      },
      {
        ...(options.request === undefined ? {} : { request: options.request }),
      },
    );
  }

  /** List signatures */
  async listSignatures(
    options: GeneralListSignaturesOptions = {},
  ): Promise<GeneralListSignaturesResponse> {
    return (await this.listSignaturesWithResponse(options)).data;
  }

  /** List signatures; include response metadata. */
  async listSignaturesWithResponse(
    options: GeneralListSignaturesOptions = {},
  ): Promise<ApiResponse<GeneralListSignaturesResponse>> {
    return this.#client._callWithResponse<GeneralListSignaturesResponse>(
      {
        operationId: "listSignatures",
        method: "GET",
        path: "/signatures",
      },
      {
        ...(options.request === undefined ? {} : { request: options.request }),
      },
    );
  }
}

export interface ResourceCollection {
  readonly user: UserResource;
  readonly ports: PortsResource;
  readonly payments: PaymentsResource;
  readonly general: GeneralResource;
}

export function createResourceCollection(client: ResourceClient): ResourceCollection {
  return {
    user: new UserResource(client),
    ports: new PortsResource(client),
    payments: new PaymentsResource(client),
    general: new GeneralResource(client),
  };
}
