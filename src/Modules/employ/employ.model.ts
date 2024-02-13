
import Objection, { Model, QueryBuilderType } from 'objection'
import { DOMAIN }                             from "../../config"

import { TimestampedModel }                   from '../Shared/TimestampedModel'


export default class Employ extends TimestampedModel {

    // Table name
    static tableName = 'employ'
    static defaultSort = 'name'

    // Table columns
    id!: number
    name!: string 
    from!:string|number
    to!:string|number
    status!:boolean | string
    department_id!:number
    management_id!:number
    user_id!:string
    number!:number|string


    static jsonSchema = {
        type: 'object',
   
        properties: {
            name: { type: 'string', minLength: 1 }
        }
    }

    // Formats img and thumb fields when existing model value returns from database


    /*
     * ---------------------------------------------------------------------
     * Model Relations
     * ---------------------------------------------------------------------
     */
    
    // One-to-many relation with Subcategory model
   
       
       
    

        
         

        
}

