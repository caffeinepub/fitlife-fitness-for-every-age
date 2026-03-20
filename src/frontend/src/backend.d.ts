import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Testimonial {
    id: bigint;
    age: bigint;
    transformation: string;
    review: string;
    name: string;
    rating: bigint;
}
export interface backendInterface {
    getAllTestimonialsByRating(): Promise<Array<Testimonial>>;
    getTestimonial(id: bigint): Promise<Testimonial>;
    init(): Promise<void>;
}
