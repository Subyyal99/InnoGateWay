/**
 * this model class contains variable for clients data
 */
export class ClientInfo {
  /**
   * short code of the client
   */
  shortCode: string;
  /**
   * no .of messages allowed to send
   */
  noOfMessageAllowed: number;
  /**
   * message to expire after time
   */
  expireAfter: number;
  /**
   * name of the country short code is registered
   */
  country: string;
  /**
   * services of the client
   */
  services: string;
  /**
   * SMSC for the short code
   */
  smsc: string;
  /**
   * user id
   */
  userId: number;
}
