
import bcrypt from 'bcryptjs'
import {supabase} from '../server.mjs'

export const register = async (req, res) =>{
    const{ fname, lname, email, password, passwordConfirm} = req.body;

    

    const salt= await bcrypt.genSalt();
    let hashedPassword = await bcrypt.hash(password, salt)

    const { data, error } = await supabase.auth.signUp({
    first_name: fname,
    last_name: lname,
    email: email,
    password: hashedPassword
  })
    if(error){
        console.log("ERROR SIGNING UP" + error)
    }
    
    res.render('index')
}
    /*

    insertData(fname,lname,email,hashedPassword)


 try{
    
    validation(email,password,passwordConfirm);
    
    insertData(fname, lname, email, hashedPassword);

    res.render('user');


 }catch(e){
    console.log(e);
 }
 */

 asdas

 export const login =async(req,res) =>{

    const {email, password} = req.body
    String(email)
    String(password)

    
    const { data, error } = await supabase
    .from('users')
    .select('email','password')
    .eq('email', email)
    .eq( 'password',password)
    console.log(data)

    if(error){
        console.log('there was an error ' + error)
    }
    if(data){
        res.render('user')
    }

 }


async function validation(email,password,passwordConfirm){

    const {data, error} =await supabase.from('users').select().eq('email',email);
    if(error){
        console.log(error)
    }
    if(data > 0){
        return res.render('register', {
            messege: 'Email already exist'
        })
    }else if(password !== passwordConfirm){
        return res.render('register',{
            messege: 'Password do not match'
        })
    }

}

async function insertData(fname, lname, email, hashedPassword){
        const { error } = await supabase
        .from('users')
        .insert([
        { first_name:fname, last_name: lname, email: email, password:hashedPassword },
        ])
        if(error){
            
        console.log(error);
        }
}

