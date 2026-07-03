export const DEPLOY_TYPES = ["prod", "dev", "maintenance"] as const;

export type DeployType = (typeof DEPLOY_TYPES)[number];

const DEFAULT_DEPLOY_TYPE: DeployType = "dev";

export function getDeployType(): DeployType {
  const value = process.env.DEPLOY_TYPE?.toLowerCase();

  if (DEPLOY_TYPES.includes(value as DeployType)) {
    return value as DeployType;
  }

  return DEFAULT_DEPLOY_TYPE;
}

export function isMaintenanceDeploy() {
  return getDeployType() === "maintenance";
}

export function isProdDeploy() {
  return getDeployType() === "prod";
}

export function isDevDeploy() {
  return getDeployType() === "dev";
}
