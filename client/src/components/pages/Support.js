import React, { useState } from 'react';
import FAQ from '../FAQ';
import allFaqs from '../faqs';


const Support = () =>{
	const [faqs, setFaqs] = useState(allFaqs);
	const toggleFAQ = index =>{
		setFaqs(faqs.map((faq,i) =>{
			if(i === index) {
				faq.open = !faq.open
			} else {
				faq.open = false
			}
			return faq
		}))
	}
	return(
<>
		<div className="faqs">
		<div style={{fontSize: "2rem", textAlign: "center"}}>FAQ's</div>
        {faqs.map((faq, i) => (
          <FAQ faq={faq} index={i} toggleFAQ={toggleFAQ} />
        ))}
      </div>
     
      </>
		)
}


export default Support;