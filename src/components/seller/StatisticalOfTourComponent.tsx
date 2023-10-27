import {FC} from 'react';
import Paragraph from "@/components/ui/Paragraph";

interface StatisticalOfTourComponentProps {
    text:string
    total:number |undefined
}

//bang

const StatisticalOfTourComponent: FC<StatisticalOfTourComponentProps> = ({text,total}) => {
    return (
      <div className={'pr-3 flex-1'}>
          <Paragraph className={'font-bold text-white'} size={'md'} >{text}</Paragraph>
          <Paragraph  size={'sm'} className={'text-gray-100'}>{total}</Paragraph>
      </div>
    );
}

export default StatisticalOfTourComponent;
