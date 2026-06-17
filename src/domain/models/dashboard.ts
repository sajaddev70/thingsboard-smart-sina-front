export interface Dashboard {
  id: {
    id: string;
    entityType: string;
  };
  createdTime: number;
  tenantId: {
    id: string;
    entityType: string;
  };
  title: string;
  name: string;
  image?: string;
  mobileHide?: boolean;
  mobileOrder?: number;
}
