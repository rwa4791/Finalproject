import React from "react";
//import "./form.css";

const form = () =>

<Row>
		<Input placeholder="Placeholder" s={6} label="Item" />
		<Input s={6} label="Price" />
		<Input type="Quanity" label="Quanity" s={12} />
		<Input s={12} type='select' label="Materialize Select" defaultValue='1'>
		<option value='1'>Cash</option>
		<option value='2'>Credit</option>
		</Input>
		<Input type="email" label="Email" s={12} />
<div>
		<Button waves='light'>Submit</Button>
</div>
</Row>



export default form;
