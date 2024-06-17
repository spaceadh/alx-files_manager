/* eslint-disable import/no-named-as-default */
/* eslint-disable no-unused-vars */
import { mkdir, writeFile, stat, existsSync, realpath } from 'fs';
import { join as joinPath } from 'path';
import { Request, Response } from 'express';
import { contentType } from 'mime-types';
import mongoDBCore from 'mongodb/lib/core';
import dbClient from '../utils/db';
import { getUserFromXToken } from '../utils/auth';
import { tmpdir } from 'os';
import { promisify } from 'util';
import Queue from 'bull/lib/queue';
import { v4 as uuidv4 } from 'uuid';

const VALID_FILE_TYPES = {
    folder: 'folder',
    file: 'file',
    image: 'image',
  };
  const ROOT_FOLDER_ID = 0;
  const DEFAULT_ROOT_FOLDER = 'files_manager';
  const mkDirAsync = promisify(mkdir);
  const writeFileAsync = promisify(writeFile);
  const statAsync = promisify(stat);
  const realpathAsync = promisify(realpath);
  const MAX_FILES_PER_PAGE = 20;
  const fileQueue = new Queue('thumbnail generation');
  const NULL_ID = Buffer.alloc(24, '0').toString('utf-8');
  const isValidId = (id) => {
    const size = 24;
    let i = 0;
    const charRanges = [
      [48, 57], // 0 - 9
      [97, 102], // a - f
      [65, 70], // A - F
    ];
    if (typeof id !== 'string' || id.length !== size) {
      return false;
    }
    while (i < size) {
      const c = id[i];
      const code = c.charCodeAt(0);
  
      if (!charRanges.some((range) => code >= range[0] && code <= range[1])) {
        return false;
      }
      i += 1;
    }
    return true;
  };
  