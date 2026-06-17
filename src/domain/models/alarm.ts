export enum AlarmSeverity {
  CRITICAL = 'CRITICAL',
  MAJOR = 'MAJOR',
  MINOR = 'MINOR',
  WARNING = 'WARNING',
  INDETERMINATE = 'INDETERMINATE',
}

export enum AlarmStatus {
  ACTIVE_UNACK = 'ACTIVE_UNACK',
  ACTIVE_ACK = 'ACTIVE_ACK',
  CLEARED_UNACK = 'CLEARED_UNACK',
  CLEARED_ACK = 'CLEARED_ACK',
}

export interface Alarm {
  id: {
    id: string;
    entityType: string;
  };
  createdTime: number;
  tenantId: {
    id: string;
    entityType: string;
  };
  customerId?: {
    id: string;
    entityType: string;
  };
  name: string;
  type: string;
  originator: {
    id: string;
    entityType: string;
  };
  originatorName?: string;
  severity: AlarmSeverity;
  status: AlarmStatus;
  startTs: number;
  endTs: number;
  ackTs: number;
  clearTs: number;
  details: any;
  propagate: boolean;
  propagateToOwner: boolean;
  propagateToTenant: boolean;
}
