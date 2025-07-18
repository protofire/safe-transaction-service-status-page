import axios, { RawAxiosRequestConfig } from "axios";

import chain from "src/models/chain";

const ENDPOINTS = {
  CONFIG_SERVICE: "/api/v1/chains/",
  GATEWAY: "/v1/chains?cursor=limit%3D50%26offset%3D0",
};

async function getChains(
  baseUrl: string,
  options?: RawAxiosRequestConfig,
): Promise<chain[]> {
  const fetchFromEndpoint = async (endpoint: string) => {
    try {
      const origin = new URL(baseUrl).origin;
      const { data } = await axios.get(new URL(endpoint, origin).href, options);
      return data.results;
    } catch (error) {
      return null;
    }
  };

  // Try config service endpoint first, then fall back to gateway
  const configServiceResult = await fetchFromEndpoint(ENDPOINTS.CONFIG_SERVICE);
  if (configServiceResult) return configServiceResult;

  const gatewayResult = await fetchFromEndpoint(ENDPOINTS.GATEWAY);
  if (gatewayResult) return gatewayResult;

  // If both attempts fail, throw an error
  throw new Error(
    "Failed to fetch chains from both config service and gateway endpoints",
  );
}

export default getChains;
