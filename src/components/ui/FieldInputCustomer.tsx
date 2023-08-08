// import {FC} from 'react';
// import Label from "@/components/ui/Label";
// import {FormControlLabel, Input, Radio, RadioGroup} from "@mui/material";
// import * as React from "react";
//
// interface FieldInputCustomerProps {
//     index:number
//     children: string
// }
//
// //bang
//
// const FieldInputCustomer: FC<FieldInputCustomerProps> = ({}) => {
//     return (
//        <>
//            <Label className={'font-bold pb-0'}>Information
//                children {index + 1} </Label>
//            <Input placeholder={'Name'} sx={{outline: 'none', width: '100%'}}
//                   data={children[index]?.name}
//                   value={children[index]?.name}
//                   onChange={(e) => handleInformationChange('child',index, "name", e.target.value)}
//            />
//            <Input placeholder={'Age'} sx={{outline: 'none', width: '100%'}}
//                   data={children[index]?.age}
//                   value={children[index]?.age}
//                   type={"number"}
//                   onChange={(e) => handleInformationChange('child',index, "age", e.target.value)}
//            />
//            <RadioGroup
//                row
//                aria-labelledby="demo-radio-buttons-group-label"
//                defaultValue="Men"
//                name="radio-buttons-group"
//                value={children[index]?.sex}
//                onChange={(e) => handleInformationChange('child',index, "sex", e.target.value)}
//            >
//                <FormControlLabel value="Men" control={<Radio/>} label="Male"/>
//                <FormControlLabel value="Women" control={<Radio/>} label="Female"/>
//            </RadioGroup>
//        </>
//     );
// }
//
// export default FieldInputCustomer;