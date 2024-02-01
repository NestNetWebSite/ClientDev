import { Quill } from 'react-quill';

const Size = Quill.import('attributors/style/size');
Size.whitelist = ['9px', '10px', '11px', '12px', '14px', '16px', '18px', '20px', '22px', '24px', '26px', '28px'];

Quill.register(Size, true);

export const modules = { toolbar: { container: '#toolbar' } };
export const formats = [
    'size',
    'header',
    'bold',
    'italic',
    'underline',
    'align',
    'strike',
    'blockquote',
    'background',
    'list',
    'bullet',
    'color',
    'width',
];

export default function QuillToolbar() {
    return (
        <div
            id='toolbar'
            style={{ borderColor: 'rgb(229 231 235)', border: 'none', display: 'flex', justifyContent: 'center' }}
        >
            <span className='ql-formats'>
                <select className='ql-size' defaultValue='16px'>
                    <option value='9px'>9px</option>
                    <option value='10px'>10px</option>
                    <option value='11px'>11px</option>
                    <option value='12px'>12px</option>
                    <option value='14px'>14px</option>
                    <option value='16px'>16px</option>
                    <option value='18px'>18px</option>
                    <option value='20px'>20px</option>
                    <option value='22px'>22px</option>
                    <option value='24px'>24px</option>
                    <option value='26px'>26px</option>
                    <option value='28px'>28px</option>
                </select>
            </span>
            <span className='ql-formats'>
                <button className='ql-bold' />
                <button className='ql-italic' />
                <button className='ql-underline' />
                <button className='ql-strike' />
            </span>
            <span className='ql-formats'>
                <button className='ql-list' value='ordered' />
                <button className='ql-list' value='bullet' />
                <button className='ql-indent' value='-1' />
                <button className='ql-indent' value='+1' />
            </span>
            <span className='ql-formats'>
                <button className='ql-blockquote' />
                <button className='ql-direction' />
            </span>
            <span className='ql-formats'>
                <select className='ql-align' />
                <select className='ql-color' />
            </span>
        </div>
    );
}
