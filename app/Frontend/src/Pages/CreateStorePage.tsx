import { Card } from '@material-ui/core';
import { useContext, useState } from 'react';
import { Col, Container, Row } from 'react-grid-system';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { produce } from 'immer';
import axios from 'axios';
import {UserContext} from '../Context/UserContext';
import { FilterDramaTwoTone } from '@material-ui/icons';

interface menuType {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  img : string;
}

interface FormValues {
  shop: string;
  ownerId: string;
  area: string;
  status: string;
  fileupload : string;
}

// interface files {
//   files : string;
// }

export default function CreateStorePage() {
  const userContext = useContext(UserContext).user;
  const [file, setFile] = useState("");
  const [menuImg, setMenuImg] = useState([] as any);
  const { register, handleSubmit } = useForm<FormValues>();
  const [menuFields, setmenuField] = useState<menuType[]>([
    {
      id: '',
      name: '',
      price: 0,
      description: '',
      category: '',
      img : '',
    },
  ]);
  const onSubmit = (data: FormValues) => {
    const formData = new FormData();
    menuImg.forEach((file : any) => formData.append('files[]',file));
    formData.append("image",file);
    formData.append("shop",data.shop);
    formData.append("ownerId",data.ownerId);
    formData.append("area",data.area);
    formData.append("menu",JSON.stringify(menuFields));
    const finalData = {...data, menu : menuFields};
    axios.post('http://13.250.64.65:9000/api/shops/upload',formData).then((res) => console.log('res :',res)).catch((err) => console.log('err : ',err));
    alert(JSON.stringify(formData));
  };

  const handleUpload = (event : any) => {
    setFile(event.target.files[0]);
  }
  const handleAddFields = () => {
    setmenuField([
      ...menuFields,
      {
        id: '',
        name: '',
        price: 0,
        description: '',
        category: '',
        img : '',
      },
    ]);
  };

  const imgChangeHandler = (e : any) => {
    const files = [...menuImg];
    files.push(...e.target.files);
    setMenuImg(files)
  }

  const handleRemoveFields = (index: number) => {
    console.log('pop :', index);
    const values = [...menuFields];

    values.splice(index, 1);
    setmenuField(values);
  };

  // console.log('menu : ', menuFields);
  return (
    <Container>
      <h2>Create Store</h2>
      <Card style={{ display: 'flex', flexFlow: 'column' }}>
        {/* <Row> */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            Shop name : 
            <input
              {...register('shop', { required: 'error message' })}
              placeholder="Shop name"
            />
            {/* {errors.firstname && <div className="error">Enter your name</div>} */}
          </div>

          <div>
            Area :{' '}
            <select {...register('area')}>
              <option value="">Select...</option>
              <option value="A">Canteen A</option>
              <option value="B">Canteen B</option>
            </select>
          </div>

          <div>
            Upload Shop Image :
            <input onChange={handleUpload} type='file'/>
          </div>
          <form>
            {menuFields.map((menu, index) => (
              <>
                <h4>Menu {index + 1}</h4>
                <div key={menu.id}>
                  <input
                    onChange={(e) => {
                      const name = e.target.value;
                      setmenuField((currentMenu) =>
                        produce(currentMenu, (v) => {
                          v[index].name = name;
                        })
                      );
                    }}
                    value={menu.name}
                    placeholder="Food name"
                    // {...register('menu')}
                  />
                  <input
                    onChange={(e) => {
                      const price = e.target.value;
                      setmenuField((currentMenu) =>
                        produce(currentMenu, (v) => {
                          v[index].price = +price;
                        })
                      );
                    }}
                    value={menu.price}
                    placeholder="Price"
                  />
                  <input
                    onChange={(e) => {
                      const description = e.target.value;
                      setmenuField((currentMenu) =>
                        produce(currentMenu, (v) => {
                          v[index].description = description;
                        })
                      );
                    }}
                    value={menu.description}
                    placeholder="description"
                  />
                  <input
                    onChange={(e) => {
                      const category = e.target.value;
                      setmenuField((currentMenu) =>
                        produce(currentMenu, (v) => {
                          v[index].category = category;
                        })
                      );
                    }}
                    value={menu.category}
                    placeholder="Category"
                  />

                  <div> Upload food Image : <input type='file' value={menu.img} onChange={(e) => {
                      const img = e.target.value;
                      setmenuField((currentMenu) =>
                        produce(currentMenu, (v) => {
                          v[index].img = img;
                        })
                      );
                    }} /></div>

                  <IconButton
                    disabled={menuFields.length === 1}
                    onClick={() => handleRemoveFields(index)}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <IconButton onClick={handleAddFields}>
                    <AddIcon />
                  </IconButton>
                </div>
              </>
            ))}
          </form>
          <input type="submit" />
        </form>
        {/* </Row> */}
      </Card>
      <Card>
      </Card>
      <div id="upload-box">
      {/* <input type="file" onChange={handleUpload} /> */}
      {/* <p>Filename: {file.name}</p>
      <p>File type: {file.type}</p>
      <p>File size: {file.size} bytes</p> */}
    </div>
      {/* <pre>{JSON.stringify(menuFields, null, 2)}</pre> */}
    </Container>
  );
}

