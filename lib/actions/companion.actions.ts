"use server"
import { auth } from "@clerk/nextjs/server"
import { createSubabaseClient } from "../supabase"

export const createCompanion = async(formData :CreateCompanion) => {
   
    const {userId:auther}=await auth()
    const supabase= createSubabaseClient()

    const {data ,error}=await supabase.from('Companions').insert({
        ...formData,
        auther
    }).select()


    if(error || !data){
                console.log(error?.message)

        throw new Error(error?.message || 'Failed to create companion')
    }

    return data[0]

}