import React from 'react';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';


const FAQ = ({ faq, index, toggleFAQ}) =>{
	return(
		<div
			className={"faq " + (faq.open ? 'open' : '')}
			key={index}
			onClick={() => toggleFAQ(index)}
		>
			{faq.open ? <div className="faq-question">
				{faq.question}
			<ArrowUpwardIcon style={{float: "right"}}/></div> : <div className="faq-question">
				{faq.question}
			<ArrowDownwardIcon style={{float: "right"}}/></div>}
			<div className="faq-answer">
				{faq.answer}
			</div>
		</div>
		)
}

export default FAQ;