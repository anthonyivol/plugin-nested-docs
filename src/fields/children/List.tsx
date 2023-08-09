import React, { useEffect, useState } from 'react'
import { useConfig } from 'payload/components/utilities';
import { useField } from 'payload/components/forms'
import { Props } from 'payload/components/fields/Text';
import { useDocumentInfo } from 'payload/components/utilities';
import './index.scss';

const baseClass = 'children-list';

const ChildrenList: React.FC<Props> = (props) => {
  
  const { path, relationTo } = props;
  const { value = [], setValue } = useField({ path });
  const { serverURL, routes: { api, admin } } = useConfig();
  const { id } = useDocumentInfo()
  const [ children, setChildren ] = useState([])
  
  useEffect( () => {
    const fetchChildren = async () => {
      const result = await fetch(`${serverURL}${api}/${relationTo}?where[parent][equals]=${id}`).then( r => r.json())
      setChildren(result.docs)
      setValue( result.docs.map((doc:any) => doc.id ))
    }
    fetchChildren()
  }, [])

  return children.length > 0 && (
    <div className={baseClass}>
      <h3>Children <sup>{children.length} items</sup></h3>
      <div className="table">
        <table>
          <tbody>
          {children.map((child:any) => (
            <tr key={child.id}>
              <td>
                <a href={`${serverURL}/admin/collections/${relationTo}/${child.id}`}>{child.title}</a>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  )
};

export default ChildrenList;