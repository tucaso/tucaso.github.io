import React from 'react';

export default function Button300(props) {
  return (
    <form id="frm_botonePayco" name="frm_botonePayco" method="post" action="https://secure.payco.co/checkout.php">
      <input name="p_cust_id_cliente" type="hidden" value="14461" />
      <input name="p_key" type="hidden" value="9c68a5dce56372ab51f863588c0a100b057bd8e4" />
      <input name="p_id_invoice" type="hidden" value="" />
      <input name="p_description" type="hidden" value={props.description} />
      <input name="p_currency_code" type="hidden" value="COP" />
      <input name="p_amount" id="p_amount" type="hidden" value="450000.00" />
      <input name="p_tax" id="p_tax" type="hidden" value="0" />
      <input name="p_amount_base" id="p_amount_base" type="hidden" value="0" />
      <input name="p_test_request" type="hidden" value="FALSE" />
      <input name="p_url_response" type="hidden" value="https://www.tucaso.co/" />
      <input name="p_url_confirmation" type="hidden" value="https://www.tucaso.co/" />
      <input name="p_signature" type="hidden" id="signature" value="82bec4a85295032b64994b3e46e70171" />
      <input name="idboton" type="hidden" id="idboton" value="7512" />
      <input
        type="image"
        id="imagen"
        src="https://369969691f476073508a-60bf0867add971908d4f26a64519c2aa.ssl.cf5.rackcdn.com/btns/btn2.png"
        alt="image"
      />
    </form>
  );
}
