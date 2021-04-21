import { Card } from '@material-ui/core';
import { useState } from 'react';
import { Col, Container, Row } from 'react-grid-system';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { produce } from 'immer';

interface menuType {
  id: string;
  name: string;
  price: string;
  description: string;
  category: string;
}

interface FormValues {
  shop: string;
  ownerId: string;
  area: string;
  status: string;
}

export default function CreateStorePage() {
  const { register, handleSubmit } = useForm<FormValues>();
  const [menuFields, setmenuField] = useState<menuType[]>([
    {
      id: '',
      name: '',
      price: '',
      description: '',
      category: '',
    },
  ]);
  const onSubmit = (data: FormValues) => {
    // console.log('data :', data);
    // console.log('menu : ', menu);
    const finalData = {...data, menu : menuFields};
    alert(JSON.stringify(finalData));
  };

  const handleAddFields = () => {
    setmenuField([
      ...menuFields,
      {
        id: '',
        name: '',
        price: '',
        description: '',
        category: '',
      },
    ]);
  };

  const handleRemoveFields = (index: number) => {
    console.log('pop :', index);
    const values = [...menuFields];

    values.splice(index, 1);
    setmenuField(values);
  };

  console.log('menu : ', menuFields);
  return (
    <Container>
      <h2>Create Store</h2>
      <Card style={{ display: 'flex', flexFlow: 'column' }}>
        {/* <Row> */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            Shop name :{' '}
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
          <form>
            {menuFields.map((menu, index) => (
              <>
                <h4>Menu {index + 1}</h4>
                <div key={menu.id}>
                  <input
                    onChange={(e) => {
                      const name = e.target.value;
                      setmenuField((currentPeople) =>
                        produce(currentPeople, (v) => {
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
                      setmenuField((currentPeople) =>
                        produce(currentPeople, (v) => {
                          v[index].price = price;
                        })
                      );
                    }}
                    value={menu.price}
                    placeholder="Price"
                  />
                  <input
                    onChange={(e) => {
                      const description = e.target.value;
                      setmenuField((currentPeople) =>
                        produce(currentPeople, (v) => {
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
                      setmenuField((currentPeople) =>
                        produce(currentPeople, (v) => {
                          v[index].category = category;
                        })
                      );
                    }}
                    value={menu.category}
                    placeholder="Category"
                  />

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
          {/* <div><input {...register("menu")} placeholder="menu" /></div> */}
          <input type="submit" />
        </form>
        {/* </Row> */}
      </Card>
      <Card>
        {/* <form>
          {menuFields.map((menu, index) => (
            <div key={menu.id}>
              <input
                onChange={(e) => {
                  const name = e.target.value;
                  setmenuField((currentPeople) =>
                    produce(currentPeople, (v) => {
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
                  setmenuField((currentPeople) =>
                    produce(currentPeople, (v) => {
                      v[index].price = price;
                    })
                  );
                }}
                value={menu.price}
                placeholder="Price"
              />
              <input
                onChange={(e) => {
                  const description = e.target.value;
                  setmenuField((currentPeople) =>
                    produce(currentPeople, (v) => {
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
                  setmenuField((currentPeople) =>
                    produce(currentPeople, (v) => {
                      v[index].category = category;
                    })
                  );
                }}
                value={menu.category}
                placeholder="Category"
              />

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
          ))}
        </form> */}
      </Card>
      <pre>{JSON.stringify(menuFields, null, 2)}</pre>
    </Container>
  );
}

