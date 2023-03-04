import 'primeicons/primeicons.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.css'
import 'primeflex/primeflex.css'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Dropdown } from 'primereact/dropdown'
import { useHistory } from "react-router-dom";
import { Tag } from 'primereact/tag';
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';

const Dataproject = () => {
  const [fiscalyear, setFiscalyear] = useState([])
  const [project, setProject] = useState([])
  const [selectedfiscalyear, setSelectedFiscalyear] = useState(null);
  const [userproject, setUserproject] = useState([])
  const [showstatuspurchase, setShowstatuspurchase] = useState()
  const [value2, setValue2] = useState('')
  const [position, setPosition] = useState('center');
  const [id, setId] = useState("")
  const [displayBasic, setDisplayBasic] = useState(false)
  const [deleteprojectid, setDeleteprojectid] = useState([]);
  const [visible, setVisible] = useState(false)
  const [status, setStatus] = useState('');
  let history = useHistory();

  const dialogFuncMap = {
    'displayBasic': setDisplayBasic,
    'status': setStatus,
  }

  const detailproject = (node) => {
    return <div>
      <Button type="button" icon="pi pi-eye" className="p-button-outlined p-button-secondary" onClick={() => history.push({ pathname: "/home/detailproject", state: node })
      } />
    </div>;
  }

  const Status = (node) => {
    if (node.status === 0) {
      return <Tag className="mr-2" severity="warning" value="รอหัวหน้าฝ่ายพิจารณา" rounded></Tag>
    } else if (node.status === 1) {
      return <Tag className="mr-2" severity="info" value="รอเจ้าหน้าที่ฝ่ายแผนตรวจสอบ" rounded></Tag>
    } else if (node.status === 2) {
      return <Tag className="mr-2" severity="danger" value="ไม่ผ่านอนุมัติจากหัวหน้าฝ่าย" rounded></Tag>
    } else if (node.status === 3) {
      return <Tag className="mr-2" severity="warning" value="รอผู้บริหารพิจารณา" rounded></Tag>
    } else if (node.status === 4) {
      return <Tag className="mr-2" severity="success" value="อนุมัติโครงการ" rounded></Tag>
    } else if (node.status === 5) {
      return <Tag className="mr-2" severity="danger" value="ไม่ผ่านอนุมัติจากผู้บริหาร" rounded></Tag>
    } else {
      return node.status
    }
  }

  const show = (item) => {
    axios
      .get(`http://localhost:3001/statuspurchase/${item.project_id}`, {})
      .then((res) => {
        setShowstatuspurchase(res.data[0].statuspurchase)
      })
      .catch((error) => {
        console.log(error)
      });
    setVisible(true)
  }

  const Statuspurchase = (node) => {
    return <div>
      <Button icon="pi pi-inbox" className="p-button-success" onClick={() => show(node)} />
    </div>
  }

  const manageproject = (node) => {
    if (node.status === 2 || node.status === 5) {
      return <div>
        <Button type="button" icon="pi pi-pencil" className="p-button-warning" onClick={() => history.push({ pathname: "/home/editproject", state: node })} />
        <Button type="button" icon="pi pi-trash" className="p-button-danger" style={{ marginLeft: '.4em' }} onClick={() => { Deletesproject(node.project_id) }} />
      </div>
    } else {
      return <div>
        <Button type="button" icon="pi pi-pencil" className="p-button-warning" disabled />
        <Button type="button" icon="pi pi-trash" className="p-button-danger" style={{ marginLeft: '.4em' }} disabled />
      </div>
    }
  }

  useEffect(() => {
    axios
      .get("http://localhost:3001/fiscalyear", {})
      .then((res) => {
        setFiscalyear(res.data)
      })
      .catch((error) => {
        console.log(error)
      });
  }, []);

  const onsetFiscalyear = (e) => {
    setSelectedFiscalyear(e.value);
  }

  useEffect(() => {
    Project()
  }, []);

  const Project = () => {
    axios
      .get("http://localhost:3001/project", {})
      .then((res) => {
        setProject(res.data)
        console.log('log', res)
      })
      .catch((error) => {
        console.log(error)
      });
  }

  useEffect(() => {
    axios
      .get(`http://localhost:3001/userproject`, {})
      .then((res) => {
        console.log(res.data)
        setUserproject(res.data)
      }).catch((error) => {
        console.log(error)
      });
  }, []);

  const getdeleteprojectid = () => {
    axios
      .get("http://localhost:3001/deleteprojectid", {})
      .then((res) => {
        setDeleteprojectid(res.data)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const Deletesproject = (ID) => {
    axios.delete(`http://localhost:3001/deleteproject/${ID}`);
    alert(`Delete id${ID} sucessful`);
    getdeleteprojectid();
  };

  return (
    <div className="text-left">
      <div className="fit">
        <h4>ปีงบประมาณ</h4>
        <Dropdown value={selectedfiscalyear} options={fiscalyear} style={{ width: '10em' }} onChange={onsetFiscalyear} optionLabel="fiscalyear" placeholder="ทุกปี" />
        <h4>สถานะ</h4>
        <Dropdown value={value2} style={{ width: '30em' }} onChange={(e) => setValue2(e.target.value)} placeholder="ทุกสถานะ" />
        <Button label="ค้นหา" className="p-button-success" style={{ marginLeft: '.8em' }} />
      </div>
      <div style={{ marginTop: "2.5em" }}>
        <DataTable value={project} columnResizeMode="fit" showGridlines responsiveLayout="scroll" dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}>
          <Column field="project_name" header="ชื่อโครงการ" />
          <Column body={detailproject} header="รายละเอียดโครงการ" style={{ textAlign: 'center', width: "15%" }} />
          <Column body={Status} field="status" header="สถานะ" style={{ textAlign: 'center', width: "12%" }} />
          <Column body={Statuspurchase} header="สถานะการจัดซื้อจัดจ้าง" style={{ textAlign: 'center', width: "13.5%" }} />
          <Column body={manageproject} header="จัดการ" style={{ textAlign: 'center', width: "14%" }} />
          <Column field="value" header="วันที่สร้าง" style={{ textAlign: 'center', width: "12%" }} />
        </DataTable>
      </div>

      <div className="card flex justify-content-center">
        <Dialog header="สถานะจัดซื้อจัดจ้าง" visible={visible} style={{ width: '40vw' }} breakpoints={{ '950x': '75vw' }} onHide={() => setVisible(false)}>
          <InputTextarea value={showstatuspurchase} planceholder="สถานะการจัดซื้อจัดจ้าง" rows={8} cols={71.5} />
        </Dialog>
      </div>
    </div>
  );
}

export default Dataproject