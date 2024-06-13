/**
 * this model class contains variable for sms service i.e single,bulk,campaign etc
 */
export class MergeSendInfo {
  /**
   * type of the message
   */
  messageType: string;
  /**
   * name of message template
   */
  templateName: string;
  /**
   * from which code the message is being sent
   */
  from: string;
  /**
   * id of the mesage
   */
  id: string;
  /**
   * id of the service
   */
  serviceId: string;
  /**
   * label
   */
  label: string;
  /**
   * to whom to send messages to
   */
  to: string[];
  /**
   * to whom to send messages to (for multi select)
   */
  multiSelectTo: any[];
  /**
   * message string is saved in this variable
   */
  message: string;
  /**
   * name variable
   */
  name: string;
  /**
   * in campaigns to add expiry time to message
   */
  addExpiryToMessage: string;
  /**
   * in campaigns to schedule time to message
   */
  scheduleMessage: string;
  /**
   * short code from whom the message is sent
   */
  shortCode: string;
  /**
   * field of the message
   */
  field: string;
  /**
   * bosy of the message
   */
  messageBody: string;
  /**
   * message flag
   */
  flag: boolean;
  /**
   * reply message
   */
  reply: string;
}
