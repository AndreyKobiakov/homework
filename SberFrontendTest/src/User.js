import React, { useCallback } from 'react'

export default function User({ el, onDelete, disable }) {

  const deleteUser = useCallback(() => onDelete(el.id), [el.id])
  return (
    <tr key={el.id}>
      <>
        <td>{el.name}</td>
        <td>{el.surname}</td>
        <td>{el.gender}</td>
        <td>{el.joined}</td>
        <td><button
          disabled={disable}
          className="btn"
          onClick={deleteUser}>
          Удалить
        </button>
        </td>
      </>
    </tr>)

}
