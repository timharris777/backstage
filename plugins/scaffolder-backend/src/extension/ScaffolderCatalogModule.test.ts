/*
 * Copyright 2022 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { catalogProcessingExtensionPoint } from '@backstage/plugin-catalog-node';
import { ScaffolderEntitiesProcessor } from '../processor';
import { scaffolderCatalogModule } from './ScaffolderCatalogModule';
import { startTestBackend } from '@backstage/backend-test-utils';

describe('ScaffolderCatalogModule', () => {
  it('should register the extension point', async () => {
    const extensionPoint = { addProcessor: jest.fn() };
    await startTestBackend({
      services: [[catalogProcessingExtensionPoint, extensionPoint]],
      registrables: [scaffolderCatalogModule({})],
    });

    expect(extensionPoint.addProcessor).toHaveBeenCalledWith(
      new ScaffolderEntitiesProcessor(),
    );
  });
});
