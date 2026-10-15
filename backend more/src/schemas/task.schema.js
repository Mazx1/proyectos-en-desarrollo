import {z} from "zod";

export const createTaskSchema = z.object({
    title: z.string({required_error:"Title is required"}).min(3, { message: "Title must be at least 3 characters long" }),
    description: z.string({required_error:"Description is required"}).min(10, { message: "Description must be at least 10 characters long" }),
    date: z.string().date().optional(),
});