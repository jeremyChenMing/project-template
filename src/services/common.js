import * as fetch from '../utils/fetch'

export const demo = () => {
  return fetch.post('/api/demo', {})
}

export const createTenants = (data) => {
  return fetch.post('/api/v1/auth/tenants', {}, data)
}

export const updateTenants = (id, data) => {
  return fetch.patch(`/api/v1/auth/tenants/${id}`, {}, data)
}

/* eslint-disable */

export const listTenants = (keyword, page = 1, page_size = 10) => {
  return fetch.get('/api/v1/auth/tenants', {keyword, page, page_size})
}

export const listUsersforTenantId = (tenant_id, keyword, page = 1, page_size = 20) => {
  return fetch.get(`/api/v1/auth/tenants/${tenant_id}/users`, {keyword, page, page_size})
}

export const listRolesByTenantId = (tenant_id) => {
  return fetch.get(`/api/v1/auth/tenants/${tenant_id}/roles`, {include_member: 'N'})
}

export const updateByRolesAndTenantId = (tenant_id, id, auth_type) => {
  return fetch.patch(`/api/v1/auth/tenants/${tenant_id}/roles/${id}`, {}, {auth_type})
}

export const updateEmployeesByEmployeesIdAndTenantId = (tenant_id, id, u_key) => {
  return fetch.patch(`/api/v1/auth/tenants/${tenant_id}/employees/${id}`, {}, {u_key})
}

/* eslint-enable */
