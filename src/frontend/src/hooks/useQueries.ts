import { useQuery } from "@tanstack/react-query";
import type { Testimonial } from "../backend.d";
import { useActor } from "./useActor";

export function useGetTestimonials() {
  const { actor, isFetching } = useActor();
  return useQuery<Testimonial[]>({
    queryKey: ["testimonials"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllTestimonialsByRating();
    },
    enabled: !!actor && !isFetching,
  });
}
