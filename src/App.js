import logo from "./logo.svg";
import "./App.css";
import functions from "./service";
import React, { useState, useEffect } from "react";
import { Button, Input, Table, Form, Card, message, Menu, Tooltip } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import axios from "axios";

const { SubMenu } = Menu;
function App() {
  const [elements, setElements] = useState();
  const [allCitations, setAllCitations] = useState();
  const [recherche, setrecherche] = useState(false);

  const [someThingToSearch, setSomeThingToSearch] = useState();
  const getSimi = async (record) => {
    console.log(record);
    let res = await axios.post(functions.getSimilaire(record.index));
    return res;
  };
  const searchFunc = async () => {
    setrecherche(true);
    let response = await functions.recherche(someThingToSearch);
    console.log(response);

    if (response.status === 200) {
      setElements(response.data.rech);
      response.data.rech.length !== 0
        ? message.success("valid")
        : message.error("non trouvé");
    }
  };
  const handleChange = (value) => {
    setSomeThingToSearch(value.target.value);
    console.log(value.target.value);
  };
  const getAll = async () => {
    let allCitations = await functions.getAll();
    let newAll = allCitations.data.all.map((el, i) => {
      return { text: el, index: i };
    });
    console.log(newAll);
    setAllCitations(newAll);
    console.log(allCitations.data);
  };
  useEffect(() => {
    getAll();
  }, []);
  const columns = [
    {
      title: "text",
      dataIndex: "text",
      key: "name",
    },
    {
      title: "index",
      dataIndex: "index",
      key: "age",
    },
    {
      title: "actions",
      key: "action",
      render: (text, record) => (
        <Tooltip title="voir plus détails">
          <Button
            className="mx-1"
            type="dashed"
            shape="circle"
            onClick={() => {
              getSimi(record);
            }}
            icon={<EyeOutlined />}
          />
        </Tooltip>
      ),
    },
  ];
  return (
    <div className="App">
      <Menu theme="dark" mode="horizontal">
        <Menu.Item key="mail" icon={<MailOutlined />}>
          Navigation One
        </Menu.Item>
        <Menu.Item key="app" disabled icon={<AppstoreOutlined />}>
          Navigation Two
        </Menu.Item>
        <SubMenu
          key="SubMenu"
          icon={<SettingOutlined />}
          title="Navigation Three - Submenu"
        >
          <Menu.ItemGroup title="Item 1">
            <Menu.Item key="setting:1">Option 1</Menu.Item>
            <Menu.Item key="setting:2">Option 2</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="Item 2">
            <Menu.Item key="setting:3">Option 3</Menu.Item>
            <Menu.Item key="setting:4">Option 4</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <Menu.Item key="alipay">
          <a
            href="http://www.isima.rnu.tn/fra/home"
            target="_blank"
            rel="noopener noreferrer"
          >
            ISIMA
          </a>
        </Menu.Item>
      </Menu>
      <Card>
        <Input
          placeholder="Rechercher quelque chose ,exemple : فسوف"
          size="large"
          type="text"
          maxLength={100}
          onChange={handleChange}
        />
        <Button onClick={() => searchFunc()} disabled={!someThingToSearch}>
          Recherche
        </Button>
        <Table columns={columns} dataSource={elements}></Table>
        <Table columns={columns} dataSource={allCitations}></Table>
      </Card>
    </div>
  );
}

export default App;
