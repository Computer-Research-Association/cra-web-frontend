export interface ProjectPageList {
  resListProjectDtos: Project;
  totalPages: number;
}

export interface ProjectTag {
  id: number;
  name: string;
}

export interface Project {
  id?: number;
  semester: string;
  teamName: string;
  serviceName: string;
  content: string;
  gitHubUrl: string;
  serviceUrl: string;
  members: string[];
  tagNames?: string[]; // 전송 시 사용 (프론트 → 백)
  tags?: ProjectTag[]; // 수신 시 사용 (백 → 프론트)
  imageUrl?: string;
  deleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
