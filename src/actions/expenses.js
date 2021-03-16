import { INFO_WALLET } from './index';

const infoWalletAction = (info) => ({
  type: INFO_WALLET,
  payload: info,
});

export default infoWalletAction;
