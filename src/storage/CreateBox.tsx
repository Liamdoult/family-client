import React from "react";
import { useState } from "react";
import { ChangeEvent } from "react";

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { Storage as StorageAPI } from '../api';


interface CreateBoxProps {
	setBox: React.Dispatch<React.SetStateAction<StorageAPI.Box | undefined>>
}

export default function CreateBox(props: CreateBoxProps) {
	const [label, setLabel] = useState<string>("");
	const [location, setLocation] = useState<string>("")

	const { setBox } = props;

	function submit() {
		StorageAPI.createBox(label, location).then(setBox);
	}
	
	return (
		<div>
			<TextField
			  id="standard-full-width"
			  label="label"
			  style={{ margin: 8 }}
			  placeholder=""
			  fullWidth
			  margin="normal"
			  InputLabelProps={{
			    shrink: true,
			  }}
			  onChange={(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setLabel(event.target.value)}
			/>
			<TextField
			  id="standard-full-width"
			  label="location"
			  style={{ margin: 8 }}
			  placeholder=""
			  fullWidth
			  margin="normal"
			  InputLabelProps={{
			    shrink: true,
			  }}
			  onChange={(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setLocation(event.target.value)}
			/>
			<Button variant="contained" color="primary" onClick={submit} >Submit</Button>
		</div>
	);
}

