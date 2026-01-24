export type TravelStyle =
  | "慢旅行"
  | "城市漫游"
  | "徒步自然"
  | "人文在地"
  | "公路旅行"
  | "山地穿行"
  | "田野考察";

export type ServiceType = "路线设计" | "定制规划" | "带团旅行";

export interface Review {
  content: string;
  audience: string;
}

export interface Creator {
  id: string;
  slug: string;
  name: string;
  avatar: string;
  stance: string;
  tags: TravelStyle[];
  destinationSlugs: string[];
  about: string[];
  suitable: string[];
  notSuitable: string[];
  serviceIds: string[];
  groupIds: string[];
  reviews: Review[];
}

export interface Destination {
  id: string;
  slug: string;
  name: string;
  cover: string;
  description: string;
  routeCount: number;
  creatorCount: number;
  serviceIds: string[];
}

export interface Service {
  id: string;
  slug: string;
  name: string;
  type: ServiceType;
  creatorId: string;
  destinationSlugs: string[];
  summary: string;
  suitable: string[];
  notSuitable: string[];
  deliverables: string[];
  exclusions: string[];
  timeline: string;
  revision: string;
  refund: string;
  price: string;
  durationTag: string;
  styles: TravelStyle[];
}

export interface Idea {
  id: string;
  slug: string;
  title: string;
  theme: "慢旅行" | "在场体验" | "徒步与自然" | "城市漫游" | "疲惫与重置";
  summary: string;
  cover: string;
  authorId: string;
  body: string;
  cta: string;
}
