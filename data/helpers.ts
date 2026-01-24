import { creators, destinations, services, ideas } from "./index";
import type { Creator, Destination, Idea, Service, ServiceType, TravelStyle } from "./types";

export const getCreatorBySlug = (slug: string): Creator | undefined =>
  creators.find((c) => c.slug === slug);

export const getDestinationBySlug = (slug: string): Destination | undefined =>
  destinations.find((d) => d.slug === slug);

export const getServiceBySlug = (slug: string): Service | undefined =>
  services.find((s) => s.slug === slug);

export const getIdeaBySlug = (slug: string): Idea | undefined =>
  ideas.find((i) => i.slug === slug);

export const filterCreators = (options: { destination?: string; style?: TravelStyle } = {}): Creator[] => {
  const { destination, style } = options;
  return creators.filter((creator) => {
    const matchDest = destination ? creator.destinationSlugs.includes(destination) : true;
    const matchStyle = style ? creator.tags.includes(style) : true;
    return matchDest && matchStyle;
  });
};

export const filterDestinations = (search?: string): Destination[] => {
  if (!search) return destinations;
  const keyword = search.trim();
  if (!keyword) return destinations;
  return destinations.filter((dest) => dest.name.includes(keyword) || dest.description.includes(keyword));
};

export const getServicesByDestination = (slug: string): Service[] =>
  services.filter((service) => service.destinationSlugs.includes(slug));

export const filterServices = (options: {
  destinationSlug?: string;
  type?: ServiceType;
  style?: TravelStyle;
  duration?: string;
} = {}): Service[] => {
  const { destinationSlug, type, style, duration } = options;
  return services.filter((service) => {
    const matchDest = destinationSlug ? service.destinationSlugs.includes(destinationSlug) : true;
    const matchType = type ? service.type === type : true;
    const matchStyle = style ? service.styles.includes(style) : true;
    const matchDuration = duration ? service.durationTag === duration : true;
    return matchDest && matchType && matchStyle && matchDuration;
  });
};

export const filterIdeasByTheme = (theme?: Idea["theme"]): Idea[] => {
  if (!theme) return ideas;
  return ideas.filter((idea) => idea.theme === theme);
};
