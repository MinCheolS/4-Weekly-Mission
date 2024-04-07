import React, { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getFolderInfo, getLinksInfo, getSelectLinksInfo } from './api/api';
import Card from '@/components/Card';
import styles from '@/styles/Folder.module.css';
import { ModalData } from '@/components/ModalData';
import close from '@/public/close.svg';

interface FolderInfo {
  id: number;
  name: string;
}

interface LinksInfo {
  createdAt: Date | undefined;
  created_at: Date | undefined;
  description: string | null;
  imageSource: string | undefined;
  image_source: string | null;
  url: string | null;
}

type ModalOpenHandler = (name: string) => void;
type ModalCloseHandler = () => void;

export default function Folder() {
  const [folderInfo, setFolderInfo] = useState<FolderInfo[]>([]);
  const [linksInfo, setLinksInfo] = useState<LinksInfo[]>([]);
  const [selectFolder, setSelectFolder] = useState<number | null>(null);
  const [selectFolderName, setSelectFolderName] = useState<string>('전체');
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [selectModal, setSelectModal] = useState<any>(null);
  const [search, setSearch] = useState<string>('');
  const [filterLinks, setFilterLinks] = useState<LinksInfo[]>([]);
  const router = useRouter();

  const handleLoadFolderInfo = async () => {
    try {
      const data = await getFolderInfo();
      const folderInfo = data.data;
      const allFolderInfo = [{ id: 1, name: '전체' }, ...folderInfo];

      if (!folderInfo) return;
      setFolderInfo(allFolderInfo);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoadLinksInfo = async () => {
    try {
      const data = await getLinksInfo();
      const linksInfo = data.data;

      if (linksInfo === undefined) {
      }
      setLinksInfo(linksInfo);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectLinksInfo = async (folderId?: number) => {
    try {
      if (folderId === undefined) {
        return;
      } else {
        const linksInfo = await getSelectLinksInfo(folderId);
        if (Object.keys(linksInfo).length === 0) return;
        setLinksInfo(linksInfo);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickLinkFolder = (id: number, name: string) => {
    setSelectFolder(id);
    setSelectFolderName(name);
    getFolderBackground(id);
  };

  const getFolderBackground = (folderId: number) => {
    return selectFolder === folderId ? 'var(--primary)' : 'var(--white)';
  };

  const filteredLinks = linksInfo.filter((link: any) => {
    if (selectFolder === null || selectFolder === 1) {
      return true;
    }
    return link.folderId === selectFolder;
  });

  const handleOpenModal: ModalOpenHandler = (name: string) => {
    setIsOpenModal(true);
    setSelectModal(name);
  };

  const handleCloseModal: ModalCloseHandler = () => {
    setIsOpenModal(false);
  };

  const handleReset = () => {
    setSearch('');
    setFilterLinks([]);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearch(searchValue);

    const filteredLinks = linksInfo.filter((link: any) => {
      const { title, url, description } = link;
      return (
        (title && title.toLowerCase().includes(searchValue)) ||
        (url && url.toLowerCase().includes(searchValue)) ||
        (description && description.toLowerCase().includes(searchValue))
      );
    });
    setFilterLinks(filteredLinks);
  };

  useEffect(() => {
    handleLoadFolderInfo();
    handleLoadLinksInfo();
    handleSelectLinksInfo();
  }, []);

  return (
    <>
      {isOpenModal === true ? (
        <ModalData
          handleCloseModal={handleCloseModal}
          selectModal={selectModal}
          selectFolder={selectFolder}
          folderInfo={folderInfo}
          linksInfo={linksInfo}
        />
      ) : null}
      {isOpenModal === true ? null : (
        <>
          {/* <Header /> */}
          <div className={styles.FolderContainer}>
            <div className={styles.FolderTitle}>
              <div className={styles.FolderLinkAddContent}>
                <div>
                  <input placeholder='링크를 추가해 보세요' />
                </div>
                <button onClick={() => handleOpenModal('AddLinkModal')}>
                  추가하기
                </button>
              </div>
            </div>
            <div className={styles.FolderMain}>
              <form className={styles.FolderLinkSerachContent}>
                <div>
                  <input
                    placeholder='링크를 검색해 보세요'
                    type='text'
                    value={search}
                    onChange={handleChange}
                  />
                </div>
                {search.length > 0 && (
                  <img src={close.src} alt='close img' onClick={handleReset} />
                )}
              </form>
              {!linksInfo && (
                <div className={styles.FolderLinkNoneList}>
                  <p>저장된 링크가 없습니다</p>
                </div>
              )}
              {linksInfo && (
                <div className={styles.FolderLinkSaveList}>
                  <div className={styles.LinkSaveListCategory}>
                    <div className={styles.CategoryContent}>
                      {folderInfo.map((item) => (
                        <button
                          key={item.id}
                          onClick={() =>
                            handleClickLinkFolder(item.id, item.name)
                          }
                          style={{
                            backgroundColor: getFolderBackground(item.id),
                          }}
                        >
                          {item.name}
                        </button>
                      ))}
                    </div>
                    <button onClick={() => handleOpenModal('AddFolderModal')}>
                      폴더 추가
                    </button>
                  </div>
                  <div className={styles.LinkSaveListTitle}>
                    <h1>{selectFolderName}</h1>
                    {selectFolderName === '전체' ? (
                      ''
                    ) : (
                      <div className={styles.OptionContent}>
                        <button onClick={() => handleOpenModal('ShareModal')}>
                          공유
                        </button>
                        <button onClick={() => handleOpenModal('EditModal')}>
                          이름 변경
                        </button>
                        <button
                          onClick={() => handleOpenModal('DeleteFolderModal')}
                        >
                          삭제
                        </button>
                      </div>
                    )}
                  </div>
                  <div className={styles.LinkSaveListContent}>
                    <Card
                      folderLinkInfo={filteredLinks}
                      filterLinks={filterLinks}
                      handleOpenModal={handleOpenModal}
                      router={router.pathname}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* <Footer /> */}
        </>
      )}
    </>
  );
}
