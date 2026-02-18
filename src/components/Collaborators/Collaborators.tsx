import { useFormik } from "formik"; 
import * as Yup from 'yup';

// style
import co from './Callaborator.module.scss'

// APIs
import singUpAPI from "../../API/signUpAPI";

// types
import { ColabsArea } from "../../types/authTypes"

// own dispatch hook
import { useAppDispatch, useAppSelector } from "../../app.hooks"; 

const Collaborators = () => {

    const dispatch = useAppDispatch();

    const languageSelector = useAppSelector(state => state.ser.language);
    const idSelector = useAppSelector(state => state.signIn.id);
    const companySelector = useAppSelector(state => state.signIn.company);

    const errorMessagesTrans = (data: string) => { 

    let message = '';

    switch(data) {

      case 'colabsBuffer':
        languageSelector === 'En' ? message = 'Please, check the data.': message = 'Бедь ласка, перевірте введені данні.';
      break;

      case 'empty':
        languageSelector === 'En' ? message = 'Please, enter data.': message = 'Бедь ласка, введіть дані.';
      break;

      default:
        break;
    }

    return message;
    
    };

    const colabsBufferSeparate = (pack: string) => {

        const backPack: ColabsArea[] = [];
        const packSeparate: string[] = pack.split(' ');
   
        for(const index in packSeparate){
    
            // check, if password = repeat password
            if(packSeparate[index].split('_')[2] === packSeparate[index].split('_')[3]) {

                
                backPack.push({
                    //!!!The input sequence in the field 'textarea' must be clear: 
                    // Mail_Name_Password_Repeat password then a space character and the same for the second user - <@_@_@_@ @_@_@_@>!!!.
                    name: packSeparate[index].split('_')[1],
                    email: packSeparate[index].split('_')[0],
                    password: packSeparate[index].split('_')[2],
                
                });
            } else console.log('Passwords are different')
        }
  
        return backPack

    }

    const colaboratesFIFO = async (letsArg: ColabsArea) => {

            await dispatch(singUpAPI({
              company: companySelector,
              name: letsArg.name,
              email: letsArg.email,
              password: letsArg.password,
              bossId: idSelector,
            }));
    };

    const formik = useFormik({
    
          //yup stored own validate functions (for email, password...etc)
          //base on: /^[a-zA-Z0-9._%+-]+_[a-zA-Z0-9]+_[a-zA-Z0-9+_[a-zA-Z0-9+(\s[a-zA-Z0-9._%+-]+_[a-zA-Z0-9]+_[a-zA-Z0-9+_[a-zA-Z0-9+)*$/ by AI

          validationSchema: Yup.object({
            colabsBuffer: Yup.string()
              .matches(
                /^w{0}[0-9a-zA-Za-яА-Я@-_]+@\w{0}[a-zA-Za-яА-Я]+\.\w{0}[a-zA-Za-яА-Я]+_[a-zA-Z0-9]+_[a-zA-Z0-9]+_[a-zA-Z0-9]+(\sw{0}[0-9a-zA-Za-яА-Я@-_]+@\w{0}[a-zA-Za-яА-Я]+\.\w{0}[a-zA-Za-яА-Я]+_[a-zA-Z0-9]+_[a-zA-Z0-9]+_[a-zA-Z0-9]+)*$/,
                { message: errorMessagesTrans('colabsBuffer') }
              ).required(errorMessagesTrans('empty') ),
          }
        ),
    
        initialValues: {
          colabsBuffer: '',
        },
        
        onSubmit: (values, { resetForm }) => {

           const backPack = colabsBufferSeparate(values.colabsBuffer);
             console.log(formik.errors.colabsBuffer);
           if(backPack.length !== 0) {
                for(const col in backPack) {
                        colaboratesFIFO(backPack[col]);
                } 
            }else console.log('Please check the data. It seems one of the passwords is incorrect.')
    
        resetForm();
          
        },
      });
  return (
    <div>
        <div>
            <li>
                <button>Add</button>
                <button>Delete</button>
            </li>
        </div>

        <form onSubmit={formik.handleSubmit}>
            <div>
                <textarea
                    id="colaborate"
                    name="colabsBuffer"
                    onChange={formik.handleChange}
                    value={formik.values.colabsBuffer}
                    placeholder="Colaborator's"></textarea>
            </div>
            <button type="submit" title='Go' disabled={formik.errors.colabsBuffer === '' ? true : false}>Go</button>
        </form>

        <p className={co.errorsMessages}>{formik.errors.colabsBuffer !== undefined ? `${formik.errors.colabsBuffer}` : ''}</p>
       
    </div>
  )
}

export default Collaborators