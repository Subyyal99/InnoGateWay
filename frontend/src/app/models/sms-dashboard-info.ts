/**
 * this model class contains variable for sms dashboard
 */
export class SmsDashboardInfo {
  /**
   * single sms count object contains both sent and available count
   */
  singleSms: data = { available: 0, sent: 0 };
  /**
   * bulk sms count object contains both sent and available count
   */
  bulkSms: data = { available: 0, sent: 0 };
  /**
   * campaign sms count object contains both sent and available count
   */
  campaigns: data = { available: 0, sent: 0 };
}
/**
 * this data interface contain sent and available variable
 */
export interface data {
  /**
   * no of avaiable messages to send
   */
  available: number;
  /**
   * no of messages sent
   */
  sent: number;
}
