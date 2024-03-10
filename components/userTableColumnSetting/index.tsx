import { HeaderColumnsType } from '../../components/dashboard/table';
import styles from '../../components/userTableColumnSetting/UserTableColumnSetting.module.scss';
import { useEffect, useState, useCallback, SetStateAction, Dispatch } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { FiAlignJustify, FiMinusSquare, FiPlusSquare } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';
// import { columnItems, columnObj, groupColumnItems } from './items/UserTableColumnItems';
import { groupColumnItems, groupColumnObj } from './items/UserTableColumnItems';

const UserTableColumnSettingComponent = (props: {
  setUserSettingColumnModalOn: Dispatch<SetStateAction<boolean>>;
  indicatorItems: HeaderColumnsType[];
}) => {
  const { setUserSettingColumnModalOn, indicatorItems } = props;
  const [exBodyDisplayItems, setExBodyDisplayItems] = useState<Array<number>>([]); // 대분류 메뉴 open / close 관련 Array
  const [dragItems, setDragItems] = useState<Array<HeaderColumnsType>>([]); // 선택된 컬럼들을 담는 Array
  const [isBrowser, setIsBrowser] = useState<boolean>(false); // react-beautiful-dnd 오류를 해결해주는 state
  const groupColumnItems: Array<groupColumnObj> = [
    { column_group_name: '비용 지표', column_group_no: 1 },
    { column_group_name: '기본 지표', column_group_no: 2 },
    // { column_group_name: 'SDK 전환 지표', column_group_no: 3 },
    // { column_group_name: '동영상 지표', column_group_no: 4 },
  ];
  // +, - 아이콘을 클릭했을 시
  const headerClick = useCallback(
    (order: number) => {
      // console.log('order', order);
      // console.log('exBodyDisplayItems', exBodyDisplayItems);
      if (exBodyDisplayItems.includes(order) == false) {
        exBodyDisplayItems.push(order);
        setExBodyDisplayItems([...exBodyDisplayItems, order]);
      } else {
        setExBodyDisplayItems(exBodyDisplayItems.filter((el) => el !== order));
      }
    },
    [exBodyDisplayItems],
  );

  // drag가 끝났을 때 호출되는 함수 (상태저장)
  const onDragEnd = (result: any) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const items = [...dragItems];
    const [reorderedItem] = items.splice(result.source.index, 1);
    // console.log('reorderedItem', reorderedItem);
    items.splice(result.destination.index, 0, reorderedItem);
    // console.log('items', items);

    setDragItems(items);
  };

  // input checkbox 관련 change event
  const normalCheckChange = useCallback(
    (columItem: HeaderColumnsType) => {
      if (dragItems.some((el) => el.columnIndex == columItem.columnIndex)) {
        // 값이 이미 포함되어 있다면
        // console.log('!!1111');
        setDragItems(dragItems.filter((el) => el.columnIndex !== columItem.columnIndex));
      } else {
        setDragItems([...dragItems, columItem]);
      }
    },
    [dragItems],
  );

  // input checkbox 관련 check 함수
  const checkedFnc = (name: string) => {
    if (dragItems.some((el) => el.columnIndex == name)) {
      return true;
    } else {
      return false;
    }
  };

  // dragItems 삭제 함수
  const deleteItem = (value: HeaderColumnsType) => {
    setDragItems(dragItems.filter((el) => el !== value));
  };

  useEffect(() => {
    setIsBrowser(process.browser);
    const newArr = [];
    for (let i = 0; i < groupColumnItems.length; i++) {
      newArr.push(i);
    }
    setExBodyDisplayItems(newArr);
    if (sessionStorage.getItem('myIndicatorItems') !== null) {
      setDragItems(JSON.parse(sessionStorage.getItem('myIndicatorItems') ?? ''));
    } else {
      setDragItems(indicatorItems);
    }
  }, []);

  return (
    <>
      <div className={styles.user_setting_wrapper}>
        <div>
          {groupColumnItems.map((groupColumnItem, idx) => (
            <div className={styles.lg_category_column_box} key={idx}>
              <div className={styles.lg_category_column_header + ' p-4-i'}>
                {exBodyDisplayItems.includes(idx) == true ? (
                  <FiPlusSquare onClick={() => headerClick(idx)} />
                ) : (
                  <FiMinusSquare onClick={() => headerClick(idx)} />
                )}
                {groupColumnItem.column_group_name}
              </div>
              {exBodyDisplayItems.includes(idx) == false && (
                <div className={styles.lg_category_column_body}>
                  <ul>
                    {indicatorItems.map((indicatorItem, idx) => {
                      if (groupColumnItem.column_group_no == indicatorItem.columnGroupNum) {
                        return (
                          <li key={idx}>
                            <input
                              type="checkbox"
                              name={indicatorItem.columnName}
                              id=""
                              className="m-r-3"
                              value={indicatorItem.columnSeq}
                              onChange={() => normalCheckChange(indicatorItem)}
                              checked={checkedFnc(indicatorItem.columnIndex) == true}
                            />
                            <span>{indicatorItem.columnName}</span>
                          </li>
                        );
                      }
                    })}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
        <div>
          <div className={styles.select_column_wrapper}>
            {/* <div className="m-b-10 d-flex justify-content-flex-end">{dragItems.length}개 항목 선택</div> */}
            <div className="m-b-10 d-flex justify-content-flex-end">{dragItems.length}개 항목 선택</div>
            {isBrowser ? (
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                  {(provided) => (
                    <div className={styles.select_column_list} {...provided.droppableProps} ref={provided.innerRef}>
                      {dragItems.map((dragItem, idx) => (
                        <Draggable key={dragItem.columnSeq} draggableId={String(dragItem.columnSeq)} index={idx}>
                          {(provided) => (
                            <div
                              className={styles.select_column_box}
                              ref={provided.innerRef}
                              {...provided.dragHandleProps}
                              {...provided.draggableProps}
                            >
                              <div className={styles.drag_icon}>
                                <FiAlignJustify />
                              </div>
                              <p>{dragItem.columnName}</p>
                              <div className={styles.delete_icon}>
                                <MdClose onClick={() => deleteItem(dragItem)} />
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            ) : null}
          </div>
        </div>
      </div>
      <div className={styles.select_column_footer}>
        <div className={styles.btn_group}>
          <a className="btn_gm" onClick={() => setUserSettingColumnModalOn(false)}>
            <span className="inner_g">취소</span>
          </a>
          <button
            type="button"
            className={`btn_gm gm_bl m-l-10 ${dragItems.length < 1 ? 'in_active' : ''}`}
            onClick={() => {
              // console.log('dragItems', dragItems);
              sessionStorage.setItem('myIndicatorItems', JSON.stringify(dragItems));
              setUserSettingColumnModalOn(false);
            }}
          >
            <span className="inner_g">적용</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default UserTableColumnSettingComponent;
