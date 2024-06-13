/**
 * this model class contains variable for short code approval request
 */
export class ShortCodeApprovalInfo {
  /**
   * id of the shortcode
   */
  id: string;
  /**
   * id of SMSC
   */
  smscId: string;
  /**
   * SMSC
   */
  smsc: any;
  /**
   * billingOperator
   */
  billingOperator: any;
  /**
   * channel name
   */
  channelName: string;
  /**
   * id of message type
   */
  msgIdType: string;
  /**
   * host of the short code
   */
  host: string;
  /**
   * port of the short code
   */
  port: string;
  /**
   * type of the short code
   */
  type: string;
  /**
   * receive port of the short code
   */
  receivePort: number;
  /**
   * tranceveiver mode of the short code
   */
  transceiverMode: string;
  /**
   * log file of the short code
   */
  logFile: string;
  /**
   * SMSC user name
   */
  smscUsername: string;
  /**
   * SMSC user password
   */
  smscPassword: string;
  /**
   *  system type
   */
  systemType: string;
  /**
   * delay in reconnection
   */
  reconnectDelay: number;
  /**
   *  link interval enquire
   */
  enquireLinkInterval: number;
  /**
   * address range
   */
  addressRange: string;
  /**
   * source addr on
   */
  sourceAddrTon: number;
  /**
   *  source addr npi
   */
  sourceAddrNpi: number;
  /**
   * dest addr on
   */
  destAddrTon: number;
  /**
   *  dest addr npi
   */
  destAddrNpi: number;
  /**
   *  service type
   */
  serviceType: number;
  /**
   * char set
   */
  altCharset: string;
  /**
   * id of the allowed SMSC
   */
  allowedSmscId: string;
  /**
   *  id of the denied SMSC
   */
  deniedSmscId: string;
  /**
   * through put
   */
  throughput: number;
  /**
   *  flow control
   */
  flowControl: number;
  /**
   * max pending limit
   */
  maxPendingSubmits: number;
  /**
   *  wait ack
   */
  waitAck: number;
  /**
   *    wait ack expire
   */
  waitAckExpire: string;
}
