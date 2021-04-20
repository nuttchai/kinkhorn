import { Card } from "@material-ui/core";
import { useState } from "react";
import { Col, Container, Row } from "react-grid-system";
import { useForm } from "react-hook-form";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';

type menuType = {
    name: String;
    price: number;
    description: String;
    category: string;
}

type FormValues = {
    shop: string;
    ownerId: string;
    area: string;
    menu : menuType[];
    status: string;
};


export default function CreateStorePage() {
    const { register, handleSubmit } = useForm<FormValues>();
    const onSubmit = (data: FormValues) => alert(JSON.stringify(data));
    const [menuFields, setmenuField] = useState<menuType[]>([{
        name: '',
        price: 0,
        description: '',
        category: '',
    }, {
        name: '',
        price: 0,
        description: '',
        category: '',
    }]);

    const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>, index: number): void => {

    }
    const handleAddFields = () => {
        setmenuField([...menuFields, {
            name: '',
            price: 0,
            description: '',
            category: '',
        }])
      }

      const handleRemoveFields = (index : number) => {
        console.log('pop :',index);
        const values  = [...menuFields];
        
        values.splice(index, 1);
        setmenuField(values);
      }
    return (
        <Container>
            <Card style={{ display: "flex", flexFlow: "column" }}>
                {/* <Row> */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <input {...register("shop", { required: 'error message' })} placeholder="Shop name" />
                        {/* {errors.firstname && <div className="error">Enter your name</div>} */}
                    </div>

                    <div>
                        area : <select {...register("area")}>
                            <option value="">Select...</option>
                            <option value="A">Canteen A</option>
                            <option value="B">Canteen B</option>
                        </select>
                    </div>
                    {/* <div><input {...register("menu")} placeholder="menu" /></div> */}
                    <input type="submit" />
                </form>
                {/* </Row> */}
            </Card>
            <Card>
                ...
            <form>
                    {menuFields.map((menu, index) => (
                        <div key={index}>
                            <TextField
                                name='name'
                                label='Food name'
                                value={menu.name}
                                // onChange={(event: React.FormEvent<HTMLInputElement>): void => { handleChangeInput(id, event); return;}}
                            />
                            <TextField
                                name='price'
                                label='Food Price'
                                value={menu.price}
                                onChange={(event : React.ChangeEvent<HTMLInputElement>) => handleChangeInput(event,index)}
                            />
                            <TextField
                                name='description'
                                label='Food Description'
                                value={menu.description}
                                // onChange={(event) => handleChangeInput(index, event)}
                            />
                            <TextField
                                name='category'
                                label='Food Category'
                                value={menu.category}
                                // onChange={(event) => handleChangeInput(index, event)}
                            />
                            <IconButton disabled={menuFields.length === 1} onClick={() => handleRemoveFields(index)}>
                                <RemoveIcon />
                            </IconButton>
                            <IconButton onClick={handleAddFields}>
                                <AddIcon />
                            </IconButton>
                        </div>

                    ))}
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                    // endIcon={<Icon>send</Icon>}
                    // onClick={handleSubmit}
                    >Send</Button>
                </form>
            </Card>
        </Container>
    );
}
